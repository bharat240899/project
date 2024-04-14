const mongoose = require('mongoose')
const { ObjectId }=mongoose.Schema


const jobSchema = new mongoose.Schema({
    jobid: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    coursename: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    }, 
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    category: {
        type: String,
        ref:'Category',
        required:true,
       
    },
    deadline: {
        type: Date
    },
},
    { timestamps: true }
)


module.exports = mongoose.model("Job", jobSchema);