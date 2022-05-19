// Helper function for Bootstrapping Model
_HELPERFUNCTION.setup_plugins_and_export_module = (SchemaName, Schema) => {
  //console.log(SchemaName+' PluginSetup');
  SchemaName = SchemaName.toLowerCase();
  //Supports Pagination
  Schema.plugin(mongoosePaginate);
  //Supports AutoIncrement
  Schema.plugin(AutoIncrement, { id: SchemaName + "_id", inc_field: "id" });
  //AutoPopulate Certain Fields
  Schema.plugin(AutoPopulate);
  //Version Backups
  if (process.env.BACKUPVERSIONS_ENABLE == "TRUE") {
    if (!process.env.BACKUPVERSIONS_EXCLUDEMODELS.includes(SchemaName)) {
      Schema.plugin(versioning, { collection: process.env.BACKUPVERSIONS_PREFIX + SchemaName, mongoose });
    }
  }
  return mongoose.model(SchemaName, Schema);
};

_processResponseData = (params = null) => {
  let responsedata = {};
  typeofparams = "";
  responsedata.code = 200;

  Array.isArray(params) ? (typeofparams = "array") : (typeofparams = typeof params);

  switch (typeofparams) {
    case "string":
      responsedata.message = params;
      break;
    case "object":
      responsedata.data = params;
      break;
    case "number":
      responsedata.code = params;
      break;

    case "array":
      params.forEach((element) => {
        switch (typeof element) {
          case "string":
            responsedata.message = element;
            break;
          case "object":
            responsedata.data = element;
            break;
          case "number":
            responsedata.code = element;
            break;
        }
      });
      break;
  }
  return responsedata;
};

// Helper function for Response Handling
_HELPERFUNCTION.responseHandler = (res, params = null) => {
  let responsedata = {};

  responsedata = _processResponseData(params);

  return res.status(responsedata.code ?? 200).send(responsedata);
};
