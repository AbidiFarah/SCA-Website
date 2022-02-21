const mongoose =require ('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema(
    { 
      username :{
        type: String,
        required:[ true ,"Username is required"],
        minlength: [3 ,"Username must be at least 3 characters"]

      },
      email: {
          type: String ,
          unique: true ,
          required: [true ,"Email is required "],
          validate: {
              validator:(val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
              message:"Plase entre a valid Email"
            } 
        },
          password: {
              type: String ,
              required:[true ,"Password is required"],
              minlength:[8,"Password must be 8 characters pr longer"]
            },
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
      next();
    });
});

module.exports = mongoose.model("User", UserSchema)

















