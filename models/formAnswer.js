const mongoose = require("mongoose");

const formAnswerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    answer: {
        type: String,
        required: [true, "An answer must be provided"],
    }
})

module.exports = formAnswerSchema;