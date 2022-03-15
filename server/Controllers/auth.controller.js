const User = require ("../models/user.model")
const VerificationToken = require("../models/verificationToken.model")
const { sendError } = require("../utils/helper.utils")
const { generteVT, mailTransport} = require("../utils/mail.utils")
const { secret } = require("../config/jwt")


const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt');
const {isValidObjectId } = require('mongoose')

class AuthController {
    //register
     async register (req,res) {
          const user  = await User.findOne(req.body.email)

             if ( user ){
               sendError(res ,400 ,'This email is already in use try sign-in')
             }
          const NewUser =  new User(req.body)

             const VT = generteVT()
             const verificationToken = new VerificationToken({
                owner: NewUser._id,
                token: VT
             })
          await verificationToken.save()
          await NewUser.save()

             mailTransport().sendMail({
                from: 'SheCodesAfrica@gmail.com',
                to: NewUser.email,
                subject: "Verify your email account"?
                html: '<h1>${VT}</h1>'
          
             })


        NewUser
          .then(() => {
               res.status(200).json({msg: 'Success!'})
                  .cookie('usertoken' , jwt.sign({_id: NewUser._id},secret), { httpOnly : true  }) 
           }) 
          .catch((err) => res.json(err))        

    }
    //login
    async login (req,res) {
        
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
                        res.json({msg: 'Invalid login , check  your password'})
                    }
                   })
                 .catch((err) => res.json({msg: 'invalid login attempt',err}))
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


    //verifyEmail 
    verfifyEmail = async(res) => {
      const {userId , VT} =req.body
      if(!userId || !VT.trim()){
       return sendError(res,'Invalid request , missing parameters !')}
      
      if(!isValidObjectId(userId)){
        return sendError(res,'  Invalid user id ')}
    
    }
  
}
       module.exports = new AuthController();
    

    




