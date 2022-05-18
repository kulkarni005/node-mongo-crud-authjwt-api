var _controllerModule = require(require("path").join(__dirname, "_controller"));
var helperModule = require(require("path").join(__dirname, "../other/helper"));

//Below for Unsecured Testing
exports.get_unsecure_olist = async (req, res) => {
  if (!_controllerModule.Model[req.params.model]) {
    return helperModule.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }
  let data = await _controllerModule.Model[req.params.model].paginate({}, { ...req.query.pagination_options });
  return helperModule.responseHandler(res, data);
};

//Secured API 
exports.list = async (req, res) => {
  if (!_controllerModule.Model[req.params.model]) {
    return helperModule.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }
  let data = await _controllerModule.Model[req.params.model].paginate({}, { ...req.query.pagination_options });
  return helperModule.responseHandler(res, data);
};

exports.post_addedit = async (req, res) => {

  if (!_controllerModule.Model[req.params.model]) {
    return helperModule.responseHandler(res, { params: req.params }, "error", req.params.model + " Model Not Found");
  }

 

  var update = {}; 

  if(req.authtokenuser){
    update.organization= req.authtokenuser.organization;
  }

  //Filterout Fields - Only Update fields available in schema and data exists in post
  _controllerModule.Model[req.params.model].schema.eachPath(function (path) {
    if (path in req.body) {
      update[path] = req.body[path];
    }
  });

  let action='create';
  if(req.body._id){
    action='update';
  }
  let obj;
  // console.log(req.params.model,_controllerModule.Model[req.params.model],action,update);
  try{
  switch(action){

    case 'create':
    obj = await  _controllerModule.Model[req.params.model].create(update);
    break;

    case 'update':
    obj = await  _controllerModule.Model[req.params.model].update({_id:req.body._id},update);
    break; 
  }
}catch(e){
  return helperModule.responseHandler(res, { params: req.params }, "error", e.message);
}

 return helperModule.responseHandler(res, obj);
};
