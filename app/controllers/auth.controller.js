const https = require("https");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const UserModel = require("../models/user.model");
const OrganizationModel = require("../models/organization.model");
var helperModule = require(require("path").join(__dirname, "../other/helper"));

//login via email
exports.post_unsecure_login = async (req, res) => {
  let user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return helperModule.responseHandler(res, {}, "error", "User Account not Found");
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    // result == true
    if (err) {
      return helperModule.responseHandler(res, {}, "error", err);
    }
    if (!result) {
      return helperModule.responseHandler(res, {}, "error", "Invalid Password");
    }
    return _generateAccessToken(res, user);
  });
};

//login via email
exports.post_unsecure_signup = async (req, res) => {
  let orgid = await _init();
  console.log(orgid);
  if (req.body.name && req.body.email && req.body.password) {
    
    //Avoid Duplicate EmailId
    let nuser = await UserModel.findOne({
      email: req.body.email,
      organization: orgid,
    });

    if (nuser) {
        return helperModule.responseHandler(res, {}, "error", "Account with Email Already Exists");
    } 

    //Proceed to User Creation
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let newuser= new UserModel({name:req.body.name,email:req.body.email,password:req.body.password,organization:orgid});
    await newuser.save();
    return _generateAccessToken(res,newuser);

  } else {
    return helperModule.responseHandler(res, {}, "error", "Specify All Fields");
  }
};

//Fetch User Object And GenerateAccessToken
_generateAccessToken = async (res, useri) => {
  //console.log(user);
  let user = await UserModel.findOne({ _id: useri._id });
  if (!user.isActive) {
    return res.status(401).send({ message: "Account Inactive, Please Contact Support", user: user });
  }
  let tokendata = { _id: user._id, idseq: user?.idseq, name: user.name, mobile: user.mobile, email: user.email, organization_id: user.organization, organization: user.organization, isAdmin: user?.isAdmin };

  let token = jwt.sign(tokendata, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
  });

  let data = user.toJSON();
  data.token = token;
  return helperModule.responseHandler(res, data);
};

//initialize Database
//Run Only Once
_init = async (req, res) => {
  let users = await UserModel.find();
  if (users.length > 0) {
    //return res.send({ message: "Database Not Empty Users Found" });
    return users[0].organization;
  } else {
    //Create Organization
    let organization = await OrganizationModel.create({ name: "DEFAULT", alias: "default" });
    //Create First Admin User
    let user = await UserModel.create({ name: "Default Admin", email: "admin@admin.com", mobile: 9999999999, password: bcrypt.hashSync("123456", 8), organization: organization });
    return user.organization;
  }
};
