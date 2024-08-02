const { catchAsyncErrors } = require("../middlewares/catchAsyncError")
const studentModel = require("../Models/studentModel")
const ErorrHander = require("../utils/errorhandels")

const { sendToken } = require("../utils/sendToken")



exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "secure homepage " })
})

exports.currentuser = catchAsyncErrors(async (req, res, next) => {
    let student = await studentModel.findById(req.id).exec()
    res.json({ student })
})


exports.usersignup = catchAsyncErrors(async (req, res, next) => {
    let newStudent = await new studentModel(req.body).save()
    sendToken(newStudent, 201, res)
    // res.status(200).json(newStudent)
})

exports.usersignin = catchAsyncErrors(async (req, res, next) => {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec()

    if (!student) {
        return next(new ErorrHander("User not found With This email address", 404))
    }

    const isMatch = student.comparepassword(req.body.password)
    if (!isMatch) return next(new ErorrHander("wrong pasword  ", 500))

    sendToken(student, 200, res);
})

exports.usersignout = catchAsyncErrors(async (req, res, next) => {

    res.clearCookie("token");
    res.json({ message: "succesfully sign out!" })

})
