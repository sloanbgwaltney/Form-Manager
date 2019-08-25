const mongoose = require("mongoose");
const formAnswer = require("./formAnswer")

const formQuestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Drop-Down", "Input", "Radio", "Checkbox"]
    },
    label: {
        type: String,
        required: [true, "A label is required for all questions"],
        minlength: [6, "A label must have at least 6 characters"],
        maxlength: [300, "A label must be less then 301 characters"]
    },
    options: [{
        type: String,
        minlength: [3, "A option must have at least 3 characters"],
        maxlength: [100, "A option must have less then 101 characters"]
    }],
    answers: [{
        type: formAnswer
    }]
})

module.exports = formQuestionSchema;