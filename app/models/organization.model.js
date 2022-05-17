//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "Organization";
console.log("setting up Schema " + SchemaName);

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    name: { type: String, required: true },
    alias: { type: String },
    email: { type: String, index: { unique: true, sparse: true } },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

Schema.plugin(_modelModule.mongoosePaginate);

// Export model
module.exports = _modelModule.mongoose.model(SchemaName, Schema);
