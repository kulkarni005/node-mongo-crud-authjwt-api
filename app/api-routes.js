const MiddlewareModule = require("./other/middleware");

//Importing Common _controller functions
console.log("\n**** Importing Controllers ****");
var normalizedPath = require("path").join(__dirname, "./controllers");
var Controller = {};
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if (!file.includes("_controller")) {
      console.log(file);
      let mname = file.split(".")[0];
      Controller[mname] = require("./controllers/" + file);
    }
  });

module.exports = function (app) {
  // CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "authtoken, Origin, Content-Type, Accept");
    next();
  });

  //default route
  app.get("/", (req, res) => {
    res.json({ message: "Hello World !" });
  });

  //Load APIs by FuncNames
  console.log("\n**** API EndPoints *****\n");
  Object.keys(Controller).forEach((ckey) => {
    let SingleController = Controller[ckey];

    Object.keys(SingleController).forEach((cmkey) => {
      let middlewares = [];
      let secure = false;
      if (!cmkey.startsWith("_")) { //Skip all who starts with _

        if (!cmkey.includes("_unsecure") && ckey!='auth') { //By default all routes are secured
          secure = true;
          middlewares.push(MiddlewareModule.verifyAuthToken);
        }

        let apimds = cmkey.split("_");
        let apimethod = "get";
        if (apimds[0] == "get" || apimds[0] == "post" || apimds[0] == "delete") {
          apimethod = apimds[0];
        }

        let urlendpoint = "/" + ckey + "/" + apimds[apimds.length - 1];
        if(ckey=='crud'){
            urlendpoint+='/:model';
            
        }
        console.log(apimethod + " " + (secure ? "" : "[UNSECURED]") + " : " + urlendpoint);
        switch (apimethod) {
          case "get":
              middlewares.push(MiddlewareModule.pagination);
              middlewares.push(MiddlewareModule.modelFormatter); 
            app.get(urlendpoint,middlewares, SingleController[cmkey]);
            break;

          case "post":
            if(ckey!='auth'){middlewares.push(MiddlewareModule.modelFormatter);}
            app.post(urlendpoint, middlewares, SingleController[cmkey]);
            break;

          case "delete":
            break;
        }
      }
    });
  });
  console.log("\n**** End of Auto API EndPoints *****\n\n");
};
