const User = require ("../models/user.model")
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const VerificationToken = require("../models/verificationToken.model")
const ResetToken = require("../models/resetToken.model")
const { sendError } = require("../utils/helper.utils")
const sendMail = require("../Controllers/sendEmail.controller")
const { createAccessToken, createRefreshToken, createActivationToken} = require("../config/jwt")


const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const { CLIENT_URL} = process.env

const sendMail = require("../utils/mail.utils") 
const { secret , createActivationToken , ACCESS_TOKEN_SECRET ,createRefreshToken} = require("../config/jwt")
const CLIENT_URL = process.env.CLIENT_URL



class AuthController {

    //register
     async register (req,res) {

        try {
          const {username , email , password , photo } =req.body


        const user = User(req.body) 
            user
             .save()
             .then(() => {
               res.status(200).json({msg: "Success!"})
                  .cookie("usertoken" , jwt.sign({_id: user._id},secret), { httpOnly : true  }) 
                  
             }) 
             .catch((err) => res.json(err))        

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

         await User.findOne({ email:req.body.email})
            .then ((user) => {
              if (user == null) { sendError(res ,401 ,'invalid login attempt')}
              else {
                 bcrypt 
                 .compareSync(req.body.password , user.password)
                 .then ((passwordIsValid) => {
                    if (passwordIsValid) {
                        res.status(200).json({msg:'Success!'})  
                        res.cookie('usertoken', jwt.sign( { _id : user._id},secret),{
                           httpOnly: true ,
                           expiresIn: 'id'

                         })
                         
                    }
                    else {

                        res.json({msg: "Invalid login , check  your password"})
                    }
                   })
                 .catch((err) => res.json({msg: "invalid login attempt",err}))

                        res.json({msg: 'Invalid login , check  your password'})
                    }
                   })
                 .catch((err) => res.json({msg: 'invalid login attempt',err}))

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




    //verifyEmail 
    verfifyEmail = async(req ,res) => {
      const {userId , VT} =req.body
      if(!userId || !VT.trim()){
       return sendError(res,200,'Invalid request , missing parameters !')}
      
      if(!isValidObjectId(userId)){
        return sendError(res,200,'  Invalid user id ')}
      
      const user = await User.findById(userId)
      if(!user) return sendError(res,200,'Sorry , user not found!')

      if(user.verified) return sendError(res,200,' This account is already verified!')

      const token = await VerificationToken.findOne({owner: user._id })
      if(!token ) return sendError(res,200,'Sorry, user not found !')


      const isMatched = await token.compareToken(VT)
      if(!isMatched) return sendError(res,200,'Please provide a valid token !')
      
      user.verified =true

      await VerificationToken.findOneAndDelete(token._id)

      await user.save()

      mailTransport().sendMail({
         from: 'SheCodesAfrica@gmail.com',
         to: user.email,
         subject:' Welcome email',
         html: '<h1>"Email Verfied Successfully, Thanks for connecting with us</h1>'
   
      })
      res.json({
         success: true ,
         message:'Your email is verified.',
         user:{ username: user.username, email: user.email ,id: user._id}
      })
   
   }

   //forget password
   forgotPassword = async (req,res) => {
      const {email} = req.body 
      if(!email) return sendError(res,401,'Please provide a valied email')

      const user = await User.findOne({email})
      if(!user) return sendError(res,200,'User not found, invalid request !' )
      
     const token = await ResetToken.findOne ({owner: user._id})
     if(!token) return sendError(res,200,'Only after one hour you can request for another token!') 
     

     bcrypt.randomBytes(30, (err,buff) => {
        
     })
   }

  

} module.exports = new AuthController();

    

    




