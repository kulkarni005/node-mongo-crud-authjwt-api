// Setup schema
var SchemaName = "role"; 

//Schema Definition
var Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "permission", autopopulate:{select:['name','alias']} }],  
    is_active : {type:Boolean,default:true},
    is_admin : {type:Boolean,default:false},
    is_system : {type:Boolean,default:false}, 
    ..._COMMONMODELATTRIBUTES
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _HELPERFUNCTION.setup_plugins_and_export_module(SchemaName,Schema);
