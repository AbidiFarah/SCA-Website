const User = require ("../models/user.model")
const Job =require ("../models/job.model")
const bcrypt = require ("bcrypt")




class UserController {
   //Update User
     async updateUser (req,res) {
         
             if (req.body.password){
                 const salt = await bcrypt.genSalt(10)
                 req.bady.password = await bcrypt(req.body.password , salt)
             }

          try {
              const updateuser = await User.findByIdAndUpdate(req.params.id , {
                  $set:  req.body
              },{new:true}
              )
              res.status(200).json(updateuser)

          }catch (err) {
              res.status(500).json(err)
          }
        
    }


   //Delete User
   async deleteUser(req,res) {
     try {
        const user = await User.findById(req.params.id)
          try {
               await Job.deleteMany({username: user.username})
               await User.findByIdAndDelete(res.params.id)
                res.status(200).json("User has been deleted....")

            }catch (err) {
                res.status(500).json(err)
             }
        }catch (err){
        res.status(404).json("User is not found !")
         }

     }
    

    //Get user
    async getUser (req,res){
        try {
            const user = await User.findById(req.params.id)
            const {password ,...others} = user._doc
            res.status(200).json(others)
        }catch (err){
            res.status(500).json(err)
        }
    }
    
    
}
       module.exports = new UserController();
    

    




