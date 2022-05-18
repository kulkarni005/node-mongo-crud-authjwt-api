//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "organization"; 

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    name: { type: String, required: true },
    alias: { type: String },
    email: { type: String, index: { unique: true, sparse: true } },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _modelModule.setup_plugins_and_export_module(SchemaName,Schema);
