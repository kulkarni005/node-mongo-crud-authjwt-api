//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "log"; 

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    category: {type: String,default:'default'},
    action: {type: String, required: true}, 
    model_name: {type: String},
    model_id: {type: String},
    data:{},
    ..._modelModule.commonModelAttributes
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _modelModule.setup_plugins_and_export_module(SchemaName,Schema);
