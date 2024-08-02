
const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const courseModel = require("../Models/CourseModel")
const userModel = require("../Models/studentModel")
const lectureModel = require("../Models/lectureModel")
const imagekit = require("../utils/imagekit").intiImagekit()
const path = require("path")

exports.coursepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "secure homepage " })
})

exports.addcourse = catchAsyncErrors(async(req, res, next)=>{
    const {coursename,description,author,category, price} = req.body

    const file = req.files.courseimage
    // console.log(file);

    const modifyFileName = `courseimage=${Date.now()}${path.extname(file.name)}`

    const {fileId , url} = await imagekit.upload({
        file : file.data,
        fileName : modifyFileName,
    })

    courseimage = {fileId, url}

    const newcourse = await new courseModel({
        coursename,
        description,
        author,
        category,
        price,
        courseimage
    })

    await newcourse.save()
    res.json(newcourse)
})

exports.allcourses = catchAsyncErrors(async(req, res, next)=>{
    const courses = await courseModel.find().exec()
    res.json(courses)
})

exports.coursedetails = catchAsyncErrors(async(req, res, next)=>{
    const course = await courseModel.findById(req.params.id).exec()
    await course.populate("lectures")
    await course.save()
    res.json(course)

})


exports.addcourseimage = catchAsyncErrors(async(req, res, next)=>{
    const course = await courseModel.findById(req.params.id)
    const file = req.files.courseimage
    // console.log(file);

    const modifyFileName = `courseimage=${Date.now()}${path.extname(file.name)}`

    const {fileId , url} = await imagekit.upload({
        file : file.data,
        fileName : modifyFileName,
    })

    console.log(course);

    course.courseimage = {fileId, url}
    await course.save() 

    console.log(course);
    res.status(200).json({
        success:true,
        message:"course image uploded succefully"
    })
})


exports.addlecture = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    console.log(req.files.lectureimage);
    console.log(req.files.lecturevideo);

    const course = await courseModel.findById(req.params.id);
    const file = req.files.lecturevideo;
    const file1 = req.files.lectureimage;

    const modifyFileName = `lecturevideo-${Date.now()}${path.extname(file.name)}`;
    const { fileId: videoFileId, url: videoUrl } = await imagekit.upload({
        file: file.data,
        fileName: modifyFileName,
    });

    const modifyFileName1 = `lectureimage-${Date.now()}${path.extname(file1.name)}`;
    const { fileId: imageFileId, url: imageUrl } = await imagekit.upload({
        file: file1.data,
        fileName: modifyFileName1,
    });

    const lecturevideo = { fileId: videoFileId, url: videoUrl };
    const lectureimage = { fileId: imageFileId, url: imageUrl };

    const newlecture = await new lectureModel({
        lecturevideo,
        lecturename: req.body.lecturename,
        description: req.body.description,
        lectureimage,
        coursename: course._id
    });

    await newlecture.save();
    course.lectures.push(newlecture._id);
    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture video uploaded successfully"
    });
});


exports.buydecourse = catchAsyncErrors(async(req, res, next)=>{
    const user = await userModel.findById(req.id).populate("coursebuy")
    res.json(user)
})

exports.buynewcourse = catchAsyncErrors(async(req, res, next)=>{
    const user = await userModel.findById(req.id)
    const course = await courseModel.findById(req.body.id)
    user.coursebuy.push(course._id)
    await user.save()
    console.log(user);
    res.json(user)
})

exports.paymenthandler = catchAsyncErrors(async(req, res, next)=>{
    res.json(user)
})