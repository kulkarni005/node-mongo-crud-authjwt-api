const jwt = require("jsonwebtoken");

responseHandler=(res,data=null,status='success',message='')=>{ 
  return res.send({status:status,message:message,data:data});
 };

isLoggedin = (req) => {
  let token = req.headers["authtoken"];
  console.log(token);
  if (!token) {
    return false;
  }

  return (decoded = async () => jwt.verify(token, process.env.JWT_SECRET));
};

getCurrentUser = async (req) => {
  let token = req.headers["authtoken"];
  if (!token) {
    return null;
  }

  return await jwt.verify(token, process.env.JWT_SECRET);
};

const HelperModule = {
  isLoggedin,
  getCurrentUser,
  responseHandler
};

module.exports = HelperModule;
