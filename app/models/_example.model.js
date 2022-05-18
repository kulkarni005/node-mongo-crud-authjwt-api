//This is example model - copy pasta this model and name your schema, remove _ from name and Voila CRUD is ready !


//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "example"; 

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},

    ..._modelModule.commonModelAttributes 
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _modelModule.setup_plugins_and_export_module(SchemaName,Schema);
