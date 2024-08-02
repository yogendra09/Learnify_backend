const express = require("express");
const router = express.Router();

const {
  homepage,
  currentuser,
  usersignup,
  usersignout,
  usersignin,
} = require("../controllers/indexcontroller");

const { isAuthenticated } = require("../middlewares/auth");

router.get("/", isAuthenticated,homepage);

//post student is logged in hai ki nahi  /student
router.post("/user", isAuthenticated, currentuser);

//post user sign up
router.post("/user/signup", usersignup);

//post user sign in   /studen/signin 
router.post("/user/signin", usersignin);

router.get("/user/signout", isAuthenticated, usersignout);


module.exports = router;
