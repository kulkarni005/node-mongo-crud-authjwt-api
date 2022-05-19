// Setup schema
var SchemaName = "permission"; 

//Schema Definition
var Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},
    category: { type: String, required: [true ]},
    name: { type: String, required: true },
    alias: { type: String, required: true },
    is_active : {type:Boolean,default:true},
    ..._COMMONMODELATTRIBUTES
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _HELPERFUNCTION.setup_plugins_and_export_module(SchemaName,Schema);
