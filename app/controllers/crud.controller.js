var _controllerModule = require(require("path").join(__dirname, "_controller"));
var helperModule = require(require("path").join(__dirname, "../other/helper"));

//Below for Unsecured Testing
exports.get_unsecure_olist = async (req, res) => {
  if (!_controllerModule.Model[req.params.model]) {
    return _controllerModule.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }
  let data = await _controllerModule.Model[req.params.model].paginate({}, { ...req.query.pagination_options });
  return helperModule.responseHandler(res, data);
};

//Secured API 
exports.list = async (req, res) => {
  if (!_controllerModule.Model[req.params.model]) {
    return _controllerModule.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }
  let data = await _controllerModule.Model[req.params.model].paginate({}, { ...req.query.pagination_options });
  return helperModule.responseHandler(res, data);
};

exports.post_addedit = async (req, res) => {};
