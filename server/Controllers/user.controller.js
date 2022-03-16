const User = require ("../models/user.model")
const Job =require ("../models/job.model")
const bcrypt = require('bcrypt')

class UserController {

  //UPDATE
  updateUser= async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  };
  
  //DELETE
  deleteUser= async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  };
  
  //GET USER
  getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}


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
    

    




