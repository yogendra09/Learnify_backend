const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    coursename:{
        type:String,
        required:[true,"Please provide your First name"],
        minLength:[4, "First Name must be less than 4 characters"]
    
    },
    description:{
        type:String,
        required:[true,"Please provide Description"],
        minLength:[4, "First Name must be less than 4 characters"]
    },
    author:{
        type:String,
        required:[true,"Please provide author name"],
        minLength:[4, "author Name must be less than 4 characters"]  
    },
    category:{  
        type:String,
        required:[true,"Please provide category"],
        minLength:[4, "category Name must be less than 4 characters"]
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        default: 0
    },
    courseimage:{
        type:Object,
        default:{
            fileId:'',
            url : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
        }
    },
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lecture"
        }
    ],
    access:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("Course", courseSchema) 