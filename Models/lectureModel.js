const mongoose = require("mongoose")

const lectureSchema = new mongoose.Schema({
    lecturename:{
        type:String,
        required:[true,"Please provide your First name"],
        minLength:[4, "First Name must be less than 4 characters"]
    },
    description:{
        type:String,
        required:[true,"Please provide Description"],
        minLength:[4, "First Name must be less than 4 characters"]
    },
    coursename:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    lectureimage:{
        type:Object,
        default:{
            filedimg:'',
            fildurl:''
        }
    },
    lecturevideo:{
        type:Object,
        default:{
            fileId:'',
            url:''
        }
    }

},{timestamps:true})

const Lecture = mongoose.model("Lecture",lectureSchema)
module.exports = Lecture;