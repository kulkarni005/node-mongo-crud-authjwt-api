//This is Common File need to be imported by All Models

var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const AutoPopulate=require("mongoose-autopopulate");

var commonModelAttributes = { created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization" } };

setup_plugins_and_export_module = (SchemaName,Schema) => {
  //console.log(SchemaName+' PluginSetup');  
  SchemaName=SchemaName.toLowerCase();

  //Supports Pagination
  Schema.plugin(mongoosePaginate);

  //Supports AutoIncrement
  Schema.plugin(AutoIncrement, { id: SchemaName + "_id", inc_field: "id" });

  //AutoPopulate Certain Fields
  Schema.plugin(AutoPopulate);

  return mongoose.model(SchemaName, Schema);
};

module.exports = {
  mongoose,
  mongoosePaginate,
  AutoIncrement,
  commonModelAttributes,
  setup_plugins_and_export_module,
};
