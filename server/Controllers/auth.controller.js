const User = require ("../models/user.model")
const { sendError } = require("../utils/helper.utils")
const sendMail = require("../Controllers/sendEmail.controller")
const { createAccessToken, createRefreshToken, createActivationToken} = require("../config/jwt")


const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const { CLIENT_URL} = process.env
class AuthController {

    //register
     async register (req,res) {
        try {
          const {username , email , password , photo } =req.body
          const user  = await User.findOne(req.body.email)

             if ( user ){
               sendError(res ,400 ,'This email is already in use try sign-in')
             }
          const NewUser = { 
             username , 
             email,
             password,
             photo
            }

          const activationToken = createActivationToken(NewUser)
             
          const url = `${CLIENT_URL}/user/activate/${activationToken}`
           sendMail(email, url, 'Verify your email address')

         res.status(200).json({msg: 'Register Success! Please activate your email to start '})

        }catch (err) { return res.status(500).json({msg: err.message})}
            
    }

    //ActivateEmail
    async activateEmail (req,res)  {
       try {
          const {activationToken} = req.body
          const user = jwt.verify(activationToken, process.env.ACCESS_TOKEN_SECRET)
         
          console.log(user)

          const {username, email, password , photo} = user
          const check = await User.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new User({
                username,
                email,
                password,
                photo
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
      }

    //login
    async login (req,res) {
      const {email, password} = req.body
      await User.findOne({ email})
      .then ((user) => {
        if (user == null) { sendError(res ,401 ,'invalid login attempt')}
        else {
         bcrypt 
         .compareSync(password , user.password)
         .then ((passwordIsValid) => {
          if (passwordIsValid) {
           const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
             httpOnly: true,
             path: '/user/refresh_token',
             maxAge: 7*24*60*60*1000 
            })
         
             res.json({msg: "Login success!"})           
            }
          else {
            res.json({msg: 'Invalid login , check  your password'})
          }
         })
         .catch((err) => res.json({msg: 'invalid login attempt',err}))
       }
      }).catch ((err) => res.json(err))   
    }

    //getAccessToken 
    /*/async getAccessToken (req,res) {
       try{

       }
    }*/

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


    
  
} module.exports = new AuthController();
    

    




