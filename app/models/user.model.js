// Setup schema
var SchemaName = "user"; 

//Schema Definition
var Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true, sparse: true } },
    password: { type: String , required: true},
    mobile: { type: String },
    is_active: { type: Boolean, default: true }, 
    role: { type: mongoose.Schema.Types.ObjectId, ref: "role", autopopulate:{select:['name','permissions','is_admin','is_active']} }, 
    ..._COMMONMODELATTRIBUTES
  },
  { timestamps: true }
);


// Setup Plugins and Export module
module.exports = _HELPERFUNCTION.setup_plugins_and_export_module(SchemaName,Schema);
