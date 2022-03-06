const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("connected to database"))
    .catch((err) =>
      console.log("can not connect to the database because ", err)
    );
};