
const mongoose = require ('mongoose')


const BlogSchema = new mongoose.Schema(
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
    username: {
        type:String,
        required:false
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

module.exports =mongoose.model("Blog",BlogSchema)
