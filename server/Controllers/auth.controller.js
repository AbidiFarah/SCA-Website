const User = require ("../models/user.model")
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')



class AuthController {
    //register
     async register (req,res) {
        const user = User(req.body) 
            user
             .save()
             .then(() => {
               res.status(200).json({msg: "Success!"})
                  .cookie("usertoken" , jwt.sign({_id: user._id},secret), { httpOnly : true  }) 
                  
             }) 
             .catch((err) => res.json(err))        

    }
    //login
    async login (req,res) {
        
            await User.findOne({ email:req.body.email})
            .then ((user) => {
              if (user == null) {
                  res.json ({msg:"invalid login attempt"}) 
              }
              else {
                 bcrypt 
                 .compare(req.body.password , user.password)
                 .then ((passwordIsValid) => {
                    if (passwordIsValid) {
                        res
                         .json({msg:"Success!"})  
                         .cookie("usertoken", jwt.sign( { _id : user._id},secret),{
                           httpOnly: true ,
                         })
                         
                    }
                    else {
                        res.json({msg: "Invalid login , check  your password"})
                    }
                   })
                 .catch((err) => res.json({msg: "invalid login attempt",err}))
            }
           })
           .catch ((err) => res.json(err))
        
    }
    //getloggedInUser
     async getLoggedInUser(req, res) {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        await User.findById(decodedJWT.payload._id)
          .then((user) => res.json(user))
          .catch((err) => res.json(err));
    }
    //logout
       async logout(req, res) {
        res.clearCookie("usertoken");
        res.sendStatus(200);
    }
    
}
       module.exports = new AuthController();
    

    




