const mongoose =require ('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema(
    { 
      username :{
        type: String,
        unique: true,
        required:[ true ,"Username is required"],

      },
      email: {
        type: String ,
        unique: true ,
        required: [true ,"Email is required "],
         
      },
      password: {
         type: String ,
         required:[true ,"Password is required"]
      },
      photo: {
        type: String,
        default:"https://res.cloudinary.com/shecodesafrica/image/upload/v1647702357/avatar/ui_avatar_profil_user_circle-512_ha6gec.png"
      }
    } , { timestamps: true } )


//creating the virtual field for confirm password
UserSchema.virtual("confirm")
.get(() => this.confirm)
.set((value) => (this.confirm = value));


//before saving the user to the db, we will hash their password using bcrypt
UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
  
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log("hashing failed tho! now what! 20 minute rule?", err);
      next()
    })
})


module.exports = mongoose.model("User", UserSchema)

















