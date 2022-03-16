const User = require ("../models/user.model")
const VerificationToken = require("../models/verificationToken.model")
const ResetToken = require("../models/resetToken.model")
const { sendError } = require("../utils/helper.utils")
const { generteVT, mailTransport} = require("../utils/mail.utils")
const { secret } = require("../config/jwt")


const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt');


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
                subject: "Verify your email account",
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
     

     bcrypt.randomBytes(30, (err,buff => {
        
     })
   }
  
} module.exports = new AuthController();
    

    




