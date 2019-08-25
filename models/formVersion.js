const mongoose = require("mongoose")
const formQuestions = require("./formQuestions");

const formVersionSchema = new mongoose.Schema({
    version: {
        type: String,
        required: [true, "A Form Version must have a version"]
    },
    questions: [{
        type: formQuestions
    }]
})

module.exports = formVersionSchema;