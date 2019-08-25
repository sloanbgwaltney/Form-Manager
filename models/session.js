const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: [true, "A session must have a start key"]
    },
    lastUpdated: {
        type: Date,
        required: [true, "LastUpdated key is required"]
    }
})

module.exports = sessionSchema;