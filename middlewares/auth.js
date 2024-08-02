const jwt = require("jsonwebtoken")
const ErorrHander = require("../utils/errorhandels")
const { catchAsyncErrors } = require("./catchAsyncError")
const userModel = require("../Models/studentModel")


exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErorrHander("Please login in to access the resource", 401))
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET );
    // console.log(id);
    req.id = id

    next()
})

exports.iaAdmin = catchAsyncErrors(async(req, res, next)=>{
    const { token } = req.cookies;

    const { id } = jwt.verify(token, process.env.JWT_SECRECT);
    const user = await userModel.findById(id)
    // console.log(user.admin);
    if(!user.admin){
        return next(new ErorrHander("You are not an admin", 401))
    }
    next()
})

