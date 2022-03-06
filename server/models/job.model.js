const mongoose = require ('mongoose')


const JobSchema = new mongoose.Schema(
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
        required:false,
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
 }, { timestamps: true }
)

module.exports =mongoose.model("Job",JobSchema)