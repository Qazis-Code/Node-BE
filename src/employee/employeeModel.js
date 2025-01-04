var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('employee', employeeSchema);