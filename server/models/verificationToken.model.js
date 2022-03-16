const mongoose =require ('mongoose')
const bcrypt = require('bcrypt')


const VerificationTokenSchema = new mongoose.Schema(
    { 
      owner :{
        type: , 
        ref: "User" ,
        required: true 

      },
      token: {
          type: String ,
          required: true 
      },
      createdAt: {
          type: Date ,
          expires: 3600 ,
          default: Date.now()

      }
    } , { timestamps: true } )


    VerificationTokenSchema.pre("save", async function (next){
        if (this.isModified('token')){
          this.token =  await bcrypt.hash(this.token, 8)
        }
        next()
    })


    VerificationTokenSchema.methods.compareToken = async  function (token) {
         return (await bcrypt.compareSync(token, this.token))
        
    }
 
module.exports = mongoose.model("VerificationToken", VerificationTokenSchema)