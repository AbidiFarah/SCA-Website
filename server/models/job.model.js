const mongoose = require ('mongoose')


const JobsSchema = new mongoose.Schema(
 {
    title: {
        type: String ,
        required: true ,
     },
    desc: {
        type: String ,
        required: true
    },
    photo: {
        type: String,
        required:false 
    },
    email: {
        type: String ,
        required:true,
        unique:true
    },
    numContact: {
        type:Number,
        required:false
    },
    price:{
        type:String ,
        required: true 
    },
    username: {
        type:String,
        required:true
    },
    categories: {
        type: Array,
        required:true
    }
 }, { timestamps: true }
)

module.exports =mongoose.model("Job",JobsSchema)