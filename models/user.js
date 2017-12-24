const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

UserSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

UserSchema.methods.withoutPwd = function () {
    let user = this.toObject();
    delete user.password;
    return user;
}

UserSchema.methods.auth = function (pwdAttempt) {
    return bcrypt.compareSync(pwdAttempt, this.password);
}

module.exports = mongoose.model("user", UserSchema);