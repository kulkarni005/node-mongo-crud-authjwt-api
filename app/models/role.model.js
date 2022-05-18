//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "role"; 

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},
    permissions: [{ type: _modelModule.mongoose.Schema.Types.ObjectId, ref: "permission", autopopulate:{select:['name','alias']} }],  
    is_active : {type:Boolean,default:true},
    is_admin : {type:Boolean,default:false},
    is_system : {type:Boolean,default:false}, 
    ..._modelModule.commonModelAttributes
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _modelModule.setup_plugins_and_export_module(SchemaName,Schema);
