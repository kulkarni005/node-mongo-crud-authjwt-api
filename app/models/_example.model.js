//This is example model - copy pasta this model and name your schema, remove _ from name and Voila CRUD is ready !

// Setup schema
var SchemaName = "example"; 

//Schema Definition
var Schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String},

    ..._COMMONMODELATTRIBUTES
  },
  { timestamps: true }
);

// Setup Plugins and Export module
module.exports = _HELPERFUNCTION.setup_plugins_and_export_module(SchemaName,Schema);
