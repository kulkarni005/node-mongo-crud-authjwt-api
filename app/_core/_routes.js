//Load APIs by FuncNames
console.log("\n**** Looking for API EndPoints in Controllers *****\n");
Object.keys(_CONTROLLER).forEach((ckey) => {
  let SingleController = _CONTROLLER[ckey];

  Object.keys(SingleController).forEach((cmkey) => {
    let middlewares = [];
    let secure = false;
    if (!cmkey.startsWith("_")) {
      //Skip all who starts with _

      if (!cmkey.includes("_unsecure") && ckey != "auth") {
        //By default all routes are secured
        secure = true;
        middlewares.push(_MIDDLEWARE.verifyAuthToken);
      }

      let apimds = cmkey.split("_");
      let apimethod = "get";
      if (apimds[0] == "get" || apimds[0] == "post" || apimds[0] == "delete") {
        apimethod = apimds[0];
      }

      let urlendpoint = "/" + ckey + "/" + apimds[apimds.length - 1];
      if (ckey == "crud") {
        urlendpoint += "/:model";
      }
      console.log(apimethod + " " + (secure ? "" : "[UNSECURED]") + " : " + urlendpoint);
      switch (apimethod) {
        case "get":
          middlewares.push(_MIDDLEWARE.pagination);
          middlewares.push(_MIDDLEWARE.modelFormatter);
          APP.get(urlendpoint, middlewares, SingleController[cmkey]);

          if (urlendpoint.includes("main/welcome")) {
            APP.get("/",[], SingleController[cmkey]);
          }
          break;

        case "post":
          if (ckey != "auth") {
            middlewares.push(_MIDDLEWARE.modelFormatter);
          }
          APP.post(urlendpoint, middlewares, SingleController[cmkey]);
          break;

        case "delete":
          break;
      }
    }
  });
});
console.log("\n**** End of Auto API EndPoints *****\n");