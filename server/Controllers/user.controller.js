const User = require ("../models/user.model")
const Job =require ("../models/job.model")
const bcrypt = require('bcrypt')

class UserController {
   //Update User
       updateUser = async (req,res) =>{
            if (req.body.password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
         
            await  User.findByIdAndUpdate({_id: req.params.id},req.body, {new:true })
             .then ((updatedUser) => res.status(200).json(updatedUser))
             .catch((err)=> res.status(500).json(err))
    }


   //Delete User
    deleteUser = async(req,res) =>{
        await User.findById(req.params.id)
       // await Job.deleteMany({username: user.username})
       // await Blog.deleteMany({username: user.username})
        await User.deleteOne({_id: req.params.id})
        .then((deleteConfirmation) => res.status(200).json(deleteConfirmation))
        .catch((err) => res.status(500).json(err))

    }

    //Get user
     getUser = async (req,res) =>{
        await User.findById({_id: req.params.id})
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err))

    }

    //Get allUsers
    getAllUser = async (req,res) =>{
        await User.find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(500).json(err))

    }
    
    
}
       module.exports = new UserController();
    

    




