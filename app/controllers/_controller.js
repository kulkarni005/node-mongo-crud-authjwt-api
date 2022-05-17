//This is Common File need to be imported by All Controllers 

console.log('\n**** Importing Models ****');
var normalizedPath = require("path").join(__dirname, "../models");
var Model={};
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function (file) {
    if(!file.includes('_model')){
    console.log(file);
    let mname= file.split('.')[0];
    Model[mname] = require("../models/" + file); 
    }
  }); 

module.exports = { 
Model 
}
