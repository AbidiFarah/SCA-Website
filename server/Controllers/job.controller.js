const User = require ("../models/user.model")





class JobController {
   //create Jost
   async createJob (req,res){
       const newJob =  Job(req.body)
       try {
        const saveJob =  await job.save()
        res.status(200).json(saveJob)

       }catch(err){
           res.status(500).json(err)

       }
   }

   //update job
     async updateJob (req,res) {
         if (req.body._id == req.params.username){
             if (req.body.password){
                 const salt = await bcrypt.genSalt(10)
                 req.bady.password = await bcrypt(req.body.password , salt)
             }

          try {
              const updateJob = await User.findByIdAndUpdate(req.params.id , {
                  $set:  req.body
              },{new:true}
              )
              res.status(200).json(updateUser)

          }catch (err) {
              res.status(500).json(err)
          }
         }else {
           res.status(401).json(" You can update only your account ")
         }
    
    }


   //delete
   async deleteJob(req,res) {
    if (req.body._id == req.params.id){
     try {
        const User = await User.findById(req.params.id)
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

     }else {
      res.status(401).json(" You can delete only your account ")
      }
    }

    //Get user
    async getJob (req,res){
        try {
            const user = await User.findById(req.params.id)
            const {oassword ,...others} = user._doc
            res.status(200).json(others)
        }catch (err){
            res.status(500).json(err)
        }
    }
    
    
}
       module.exports = new JobController();