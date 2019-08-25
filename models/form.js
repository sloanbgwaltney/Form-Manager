const mongoose = require("mongoose");
const formVersionSchema = require("./formVersion");

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Form name is required"],
        unique: true,
        minlength: [3, "Form name must be at least 3 characters"],
        maxlength: [30, "Form name must be less then 31 characters"]
    },
    purpose: {
        type: String,
        required: [true, "A purpose is required"],
        minlength: [10, "Form purpose must be at least 10 characters"],
        maxlength: [50, "Form purpose must be less then 51 characters"]
    },
    mode: {
        type: String,
        enum: ["Public", "Private", "Invite"],
        required: "Form mode is required"
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    createdBy: {
        required: [true, "createdBy is a required field"],
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    versions: [{
        type: formVersionSchema
    }]
})

module.exports = mongoose.model("form", formSchema)