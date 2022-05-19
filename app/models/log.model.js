// Setup schema
var SchemaName = "log"; 

//Schema Definition
var Schema = mongoose.Schema(
  {
    category: {type: String,default:'default'},
    action: {type: String, required: true}, 
    model_name: {type: String},
    model_id: {type: String},
    data:{},
   ..._COMMONMODELATTRIBUTES
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _HELPERFUNCTION.setup_plugins_and_export_module(SchemaName,Schema);
