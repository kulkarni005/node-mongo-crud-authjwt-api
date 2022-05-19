console.log("\n**** Preparing CRUD Endpoint *****\n");

//CRUD LIST UNSECURED TEST
crud_test_list_unsecured = async (req, res) => {
  if (!_MODEL[req.params.model]) {
    return _HELPERFUNCTION.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }

  // Run AddEdit Hooks for This Model Controller
  let ho = await _HELPERFUNCTION.runHooks(req, res, req.params.model, "list");
  req = ho?.req ?? req;
  res = ho?.res ?? res;
  // End of Hooks

  let data = await _MODEL[req.params.model].paginate({}, { ...req.query.pagination_options });
  return _HELPERFUNCTION.responseHandler(res, data);
};
//CRUD LIST SECURED
crud_list = async (req, res) => {
  if (!_MODEL[req.params.model]) {
    return _HELPERFUNCTION.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }

  // Run AddEdit Hooks for This Model Controller
  let ho = await _HELPERFUNCTION.runHooks(req, res, req.params.model, "list");
  req = ho?.req ?? req;
  res = ho?.res ?? res;
  // End of Hooks

  let data = await _MODEL[req.params.model].paginate({}, { ...req.query.pagination_options });
  return _HELPERFUNCTION.responseHandler(res, data);
};

//CRUD ADDEDIT
crud_addedit = async (req, res) => {
  if (!_MODEL[req.params.model]) {
    return _HELPERFUNCTION.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }

  // Run AddEdit Hooks for This Model Controller
  let ho = await _HELPERFUNCTION.runHooks(req, res, req.params.model, "addedit");
  req = ho?.req ?? req;
  res = ho?.res ?? res;
  // End of Hooks

  var update = {};

  if (req.authtokenuser) {
    update.organization = req.authtokenuser.organization;
  }

  //Filterout Fields - Only Update fields available in schema and data exists in post
  _MODEL[req.params.model].schema.eachPath(function (path) {
    if (path in req.body) {
      update[path] = req.body[path];
    }
  });

  let action = "create";
  if (req.body._id) {
    action = "update";
  }
  let obj;
  // console.log(req.params.model,_MODEL[req.params.model],action,update);
  try {
    switch (action) {
      case "create":
        obj = await _MODEL[req.params.model].create(update);
        break;

      case "update":
        obj = await _MODEL[req.params.model].findOneAndUpdate({ _id: req.body._id }, update);
        break;
    }
  } catch (e) {
    return _HELPERFUNCTION.responseHandler(res,[400,e.message]);
  }

  return _HELPERFUNCTION.responseHandler(res, obj);
};

APP.get("/crud/olist/:model", [_MIDDLEWARE.modelFormatter, _MIDDLEWARE.pagination], crud_list);
APP.get("/crud/list/:model", [_MIDDLEWARE.verifyAuthToken, _MIDDLEWARE.modelFormatter, _MIDDLEWARE.pagination], crud_list);
APP.post("/crud/addedit/:model", [_MIDDLEWARE.verifyAuthToken, _MIDDLEWARE.modelFormatter], crud_addedit);

console.log("get" + " [UNSECURED]: " + "/crud/olist/:model");
console.log("get" + " : " + "/crud/list/:model");
console.log("get" + " : " + "/crud/addedit/:model");

console.log("\n**** End of CRUD Endpoint *****\n");
