const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

//Auth Token Check
verifyAuthToken = (req, res, next) => {
  let token = req.headers["authtoken"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send(err);
    }
    // console.log("Decoded :",decoded);
    req.authtokenuser = decoded;
    next();
  });
};

//modelFormatter

modelFormatter = (req, res, next) => {
  req.presetquery = {};

  //For AddEdit POST
  if (req.method == "POST") {
    //fixupsertnullidissue
    if (!req.body._id) {
      req.body._id = mongoose.Types.ObjectId();
    }
    if (!req.body.createdBy) {
      req.body.createdBy = req.authtokenuser._id;
    }
    req.body.updatedBy = req.authtokenuser._id;

    //global exclusion list for addedit
    req.modelfieldsexclusionlist = ["createdAt", "updatedAt", "_v"];
    req.modelfieldsexclusionlist.forEach((entry) => {
      delete req.body[entry];
    });

    req.presetquery.body = {
      _id: req.body._id,
      organization: req.authtokenuser.organization_id,
    };

    req.presetquery.options = {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      useFindAndModify: false,
    };
  }

  //For GET LIST
  if (req.method == "GET") {
    req.presetquery.query = {};
    if (req.authtokenuser) {
      req.presetquery.query = { organization: req.authtokenuser.organization_id };
    }
    if (req.query._id) {
      req.presetquery.query._id = req.query._id;
    }
  }
  next();
};

//Pagination Middleware
pagination = (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = 10;
  }

  if (!req.query.page) {
    req.query.page = 1;
  }

  const myCustomLabels = {
    totalDocs: "count",
    docs: "data",
  };

  req.query.pagination_options = { page: req.query.page, limit: req.query.limit, customLabels: myCustomLabels };
  next();
};

const MiddlewareModule = {
  verifyAuthToken,
  pagination,
  modelFormatter,
};

module.exports = MiddlewareModule;
