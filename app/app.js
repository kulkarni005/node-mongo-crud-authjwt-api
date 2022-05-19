let express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

//Use LODASH for lot and lots of frequently ready to use JS Functions
global._ = require("lodash"); 
//Read Config form .env File
require("dotenv").config(); 
// Initialize the app
global.APP = express();
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(helmet());

// sanitize request data
APP.use(xss());
APP.use(mongoSanitize());

//Setting Timezone
process.env.TZ = process.env.TIMEZONE;

// enable cors
APP.use(cors());
APP.options("*", cors());

//import Globals
require("./_core/_init");

//Scheduled Jobs - CRON
require("./other/cron");

//Enable CORS
APP.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "authtoken, Origin, Content-Type, Accept");
  next();
});

 

//Connect Database
mongoose
  .connect(process.env.MONGODB_URL, {
    ssl: true,
    sslValidate: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
  })
  .then(() => console.log("Database Connected "))
  .catch((err) => console.log(err));

// Setup server port
var port = process.env.PORT || 3000;

// Launch app to listen to specified port
APP.listen(port, function () {
  console.log("Running Api on port " + port);
});