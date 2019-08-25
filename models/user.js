const mongoose = require("mongoose");
const sessionSchema = require("./session");

const {hash, compare} = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username must be provided"],
        minlength: [5, "A username must have at least 5 characters"],
        maxlength: [50, "A user name must be less than 51 characters"]
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [72, "Password must be less than 73 characters"]
    },
    session: {
        type: sessionSchema
    }
})

userSchema.methods.hashPassword = async function() {
    this.password = await hash(this.password, 10);
}

userSchema.methods.comparePasswords = function(password) {
    return compare(password, this.password);
}

userSchema.methods.createSession = function() {
    if (!this.session) {
        this.session = {
            start: new Date(),
            lastUpdated: new Date()
        }
        return
    }
    this.session.start = new Date();
    this.session.lastUpdated = new Date();
}

module.exports = mongoose.model("user", userSchema);