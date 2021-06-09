const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var schema = mongoose.Schema;

const employeSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true,
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },
});

const employee = mongoose.model("employee", employeSchema);
module.exports = employee;