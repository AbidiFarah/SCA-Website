const mongoose =require ('mongoose')
const bcrypt = require('bcrypt')


const  ResetTokenSchema = new mongoose.Schema(
    { 
      owner :{
        type: String, 
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


    ResetTokenSchema.pre("save", async function (next){
        if (this.isModified('token')){
          this.token =  await bcrypt.hash(this.token, 8)
        }
        next()
    })


    ResetTokenSchema.methods.compareToken = async function (token) {
         return (await bcrypt.compareSync(token, this.token))
        
    }
 
module.exports = mongoose.model("ResetToken", ResetTokenSchema)