//Importing Common _model functions
var _modelModule = require(require("path").join(__dirname, "_model"));

// Setup schema
var SchemaName = "User";
console.log("setting up Schema " + SchemaName);

//Schema Definition
var Schema = _modelModule.mongoose.Schema(
  {
    ..._modelModule.commonModelAttributes,
    name: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true, sparse: true } },
    password: { type: String , required: true},
    mobile: { type: String },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

Schema.plugin(_modelModule.mongoosePaginate);

// Export model
module.exports = _modelModule.mongoose.model(SchemaName, Schema);
