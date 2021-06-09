const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
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

userSchema.pre("update", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model("user", userSchema);
module.exports = User;