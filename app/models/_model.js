//This is Common File need to be imported by All Models

var mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
var commonModelAttributes = { idseq: { type: Number }, createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" } };

module.exports = {
    mongoose,
    mongoosePaginate,
    commonModelAttributes
}

