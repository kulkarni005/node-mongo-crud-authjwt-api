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
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

//Setting Timezone
process.env.TZ = process.env.TIMEZONE;

// enable cors
app.use(cors());
app.options("*", cors());

//Scheduled Jobs - CRON
require("./other/cron");

// Import routes
require("./routes")(app);

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
app.listen(port, function () {
  console.log("Running Api on port " + port);
});