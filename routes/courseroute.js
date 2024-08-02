const express = require("express");
const router = express.Router();

const {
  coursepage,
  addcourse,
  coursedetails,
  allcourses,
  addcourseimage,
  addlecture,
  buydecourse,
  buynewcourse
} = require("../controllers/coursecontroller");

const { isAuthenticated, iaAdmin } = require("../middlewares/auth");



router.get("/course", isAuthenticated, coursepage);

router.get("/course/allcourses", isAuthenticated, allcourses);

router.get("/course/details/:id", isAuthenticated, coursedetails);

router.post("/course/buyedcourse", isAuthenticated, buydecourse );


router.post("/course/buynewcourse", isAuthenticated, buynewcourse );

// router.get("/course/:id", isAuthenticated, buydecourse );

// only admin can add course
router.post("/course/addcourse", isAuthenticated, iaAdmin, addcourse);

router.post("/course/addcourse/:id", isAuthenticated, iaAdmin, addcourseimage);

router.post("/course/addlecture/:id", isAuthenticated, iaAdmin, addlecture);

module.exports = router;