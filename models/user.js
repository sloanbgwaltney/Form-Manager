const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username must be provided"],
        minlength: [5, "A username must have at least 5 characters"],
        maxlength: [50, "A user name must be less than 51 characters"]
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        maxlength: [60, "Password must be 60 characters"],
        minlength: [60, "Password must be 60 characters"]
    }
})

module.exports = mongoose.model("user", userSchema);