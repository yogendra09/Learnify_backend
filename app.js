require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Razorpay = require("razorpay");
const { v4: uuidv4 } = require("uuid");
app.use(cors({ origin: true, credentials: true }));
// //dotnev
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://learnify-frontend-i0agusj0a-yogendra09s-projects.vercel.app/');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//logger
const logger = require("morgan");
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session cookies
const session = require("express-session");
const cookiesParser = require("cookie-parser");
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    secret: process.env.SESSION_SECRET,
  })
);
app.use(cookiesParser());

// dbb connected
require("./dbconnection/connectDb").dbConnectio();

const ErorrHander = require("./utils/errorhandels");
const fileUpload = require("express-fileupload");
app.use(fileUpload());

const { genratedErrors } = require("./middlewares/error");
const { isAuthenticated } = require("./middlewares/auth");

app.use("/", require("./routes/indexRoute"));
app.use("/", require("./routes/courseroute"));

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

app.post("/create/orderId", isAuthenticated, function (req, res, next) {
  // console.log(req.body.newprice);

  var options = {
    amount: req.body.newprice, // amount in the smallest currency unit
    currency: "INR",
    receipt: uuidv4(),
  };
  console.log(options, req.body.newprice);
  instance.orders.create(options, function (err, order) {
    console.log(order, err);
    res.status(201).send(order);
  });
});

app.post("/api/payment/verify", isAuthenticated, (req, res) => {
  console.log(req.body);
  const razorpayPaymentId = req.body.response.razorpay_payment_id;
  const razorpayOrderId = req.body.response.razorpay_order_id;
  const signature = req.body.response.razorpay_signature;
  const secret = "D9aSr9sGEuU6Bvgc3Lz0r6eO";
  var {
    validatePaymentVerification,
    validateWebhookSignature,
  } = require("../BackEnd/node_modules/razorpay/dist/utils/razorpay-utils");
  var result = validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    signature,
    secret
  );
  console.log(result);
  res.send(result);
});

app.all("*", (req, res, next) => {
  next(new ErorrHander(`requested url not found ${req.url}`, 404));
});
app.use(genratedErrors);

app.listen(process.env.PORT ||3000, () => {
  console.log("server is running port ", process.env.PORT);
});
