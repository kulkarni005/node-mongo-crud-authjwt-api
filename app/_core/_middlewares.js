//Auth Token Check
_MIDDLEWARE.verifyAuthToken = (req, res, next) => {
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

_MIDDLEWARE.modelFormatter = (req, res, next) => {
  req.presetquery = {};

  //For AddEdit POST
  if (req.method == "POST") {
    if (!req.body.created_by) {
      req.body.created_by = req.authtokenuser._id;
    }
    req.body.updated_by = req.authtokenuser._id;

    //global exclusion list for addedit
    req.modelfieldsexclusionlist = ["createdAt", "updatedAt", "_v"];
    req.modelfieldsexclusionlist.forEach((entry) => {
      delete req.body[entry];
    });
  }

  //For GET LIST
  if (req.method == "GET") {
    req.presetquery.query = {};
    if (req.authtokenuser) {
      req.presetquery.query = { organization: req.authtokenuser.organization_id };
    }
  }
  next();
};

//Pagination Middleware
_MIDDLEWARE.pagination = (req, res, next) => {
  if (!req.query.limit) {
    req.query.limit = process.env.PAGINATION_LIMIT;
  }

  if (!req.query.page) {
    req.query.page = 1;
  }

  req.query.pagination_options = { page: req.query.page, limit: req.query.limit };
  next();
};
