//Initiate

//SPAM THE GLOBALS
global.mongoose = require("mongoose");
global.jwt = require("jsonwebtoken");
global.mongoosePaginate = require("mongoose-paginate-v2");
global.AutoIncrement = require("mongoose-sequence")(mongoose);
global.AutoPopulate = require("mongoose-autopopulate");
global.versioning = require("mongoose-versioned");

/* DEFINE GLOBALS */
global._mongoose = mongoose;
global._MODEL = {}; //All Models
global._CONTROLLER = {}; //All Controllers
global._HELPERFUNCTION = {}; //GLOBAL HelperFunctions available throughout application
global._COMMONMODELATTRIBUTES = { created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization" } };
global._MIDDLEWARE = {}; //All Middlewares

//import Helper Functions
require("./_helpers");

//import Middleware Functions
require("./_middlewares");

console.log("\n**** Preparing Models ****");
var normalizedPath = require("path").join(__dirname, "../models");

require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if (!file.startsWith("_")) {
      console.log(file);
      let mname = file.split(".")[0];
      _MODEL[mname] = require("../models/" + file);
    }
  });

_HELPERFUNCTION.runHooks = async (req, res, model, action) => {
  console.log("Running Hooks", model, action);
  //console.log(_Controller,_Model);
};

//Importing Common _controller functions
console.log("\n**** Preparing Controllers ****");
var normalizedPath = require("path").join(__dirname, "../controllers");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if (!file.includes("_controller")) {
      console.log(file);
      let mname = file.split(".")[0];
      _CONTROLLER[mname] = require("../controllers/" + file);
    }
  });

// CRUD Routes
require("./_crud");
require("./_routes");
