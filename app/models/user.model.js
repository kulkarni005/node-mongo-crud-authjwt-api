//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "user"; 

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true, sparse: true } },
    password: { type: String , required: true},
    mobile: { type: String },
    is_active: { type: Boolean, default: true }, 
    role: { type: _modelModule.mongoose.Schema.Types.ObjectId, ref: "role", autopopulate:{select:['name','permissions','is_admin','is_active']} }, 
    ..._modelModule.commonModelAttributes
  },
  { timestamps: true }
);


// Setup Plugins and Export module
module.exports = _modelModule.setup_plugins_and_export_module(SchemaName,Schema);
