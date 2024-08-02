const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const studentModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"Please provide your First name"],
        minLength:[4, "First Name must be less than 4 characters"]
    },
    lastname:{
        type:String,
        required:[true,"Please provide your First name"],
        minLength:[4, "First Name must be less than 4 characters"]
    },
    avatar:{
        type:Object,
        default:{
            fileId:'',
            url : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
        }
    },
    contact:{
        type:String,
        // required:[true, "Contact is required"],
        maxLength:[10, "Contact must not exced 10 digits"],
        minLength:[10, "Contact must be 10 digits"],
    },
    city:{
        type:String,
        // required:[true, "City name is required"],
        minLength:[3, "City name should be more the 3 character long"]
    },
    gender:{
        type:String,
        enum:["Male", "Female", "Others"]
    },
    email:{
        type:String,
        unique:true,
        require:[true,  "Please provide your email."],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[
            15,
            "please provide  a shorter password"
        ],
        minLength:[
            2,
            "please provide a  longer password"
        ]
    },
    admin:{
        type:Boolean,
        default:false
    },
    coursebuy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ]

}, {
    timestamps:true
})

studentModel.pre("save",function(){

    if(!this.isModified("password")){
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password ,salt)
})

studentModel.methods.comparepassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

studentModel.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.COOKIE_EXPIRE,
    })

}

const student = mongoose.model("Users", studentModel)

module.exports = student;   