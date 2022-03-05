const mongoose = require("mongoose");
const uri = "mongodb+srv://farah:farah123@shecodes.f7ar8.mongodb.net/Auth?retryWrites=true&w=majority"
module.exports = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"))
    .catch((err) =>
      console.log("can not connect to the database because ", err)
    );
};