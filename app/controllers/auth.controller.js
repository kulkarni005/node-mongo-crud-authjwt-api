const https = require("https"); 
var bcrypt = require("bcryptjs");

//login via email
exports.post_unsecure_login = async (req, res) => {
  let user = await _MODEL['user'].findOne({ email: req.body.email });

  if (!user) {
    return _HELPERFUNCTION.responseHandler(res, {}, "error", "User Account not Found");
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    // result == true
    if (err) {
      return _HELPERFUNCTION.responseHandler(res, {}, "error", err);
    }
    if (!result) {
      return _HELPERFUNCTION.responseHandler(res, {}, "error", "Invalid Password");
    }
    return _generateAccessToken(res, user);
  });
};

//login via email
exports.post_unsecure_signup = async (req, res) => {
  let initdata = await _init();
  //console.log(initdata);
  if (req.body.name && req.body.email && req.body.password) {
    //Avoid Duplicate EmailId
    let nuser = await _MODEL['user'].findOne({
      email: req.body.email,
      organization: initdata.organization,
    });

    if (nuser) {
      return _HELPERFUNCTION.responseHandler(res, {}, "error", "Account with Email Already Exists");
    }

    //Proceed to User Creation
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let newuser = new _MODEL['user']({ name: req.body.name, email: req.body.email, password: req.body.password, organization: initdata.organization,role:initdata.role});
    await newuser.save();
    return _generateAccessToken(res, newuser);
  } else {
    return _HELPERFUNCTION.responseHandler(res, {}, "error", "Specify All Fields");
  }
};

//Fetch User Object And GenerateAccessToken
_generateAccessToken = async (res, useri) => {
  //console.log(user);
  let user = await _MODEL['user'].findOne({ _id: useri._id });
  if (!user.is_active) {
    return res.status(401).send({ message: "Account Inactive, Please Contact Support", user: user });
  }
  let tokendata = { _id: user._id, idseq: user?.idseq, name: user.name, mobile: user.mobile, email: user.email, organization: user.organization, role:user.role };

  let token = jwt.sign(tokendata, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
  });

  let data = user.toJSON();
  data.token = token;
  return _HELPERFUNCTION.responseHandler(res, data);
};

//initialize Database
//Run Only Once
_init = async (req, res) => {
  let initdata = {};

  let organizations = await _MODEL['organization'].find();

  if (organizations.length > 0) {
    initdata.organization = organizations[0];
  } else {
    //Create Organization
    let organization = await _MODEL['organization'].create({ name: "DEFAULT", alias: "default" });
    initdata.organization = organization;
  }

  let roles = await _MODEL['role'].find();

  if (roles.length > 0) {
    initdata.role = roles[0];
  } else {
    //Create Permission
    let permission = await _MODEL['permission'].create({ name: "DEFAULT",category: "DEFAULT", alias: "default" });
    //Create Role
    let role = await _MODEL['role'].create({ name: "DEFAULT", permissions: [permission] });
    initdata.role = role;
  }
  return initdata;
};
