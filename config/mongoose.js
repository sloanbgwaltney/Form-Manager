const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, (err) => {
    if (err) {return console.error(err)}
    console.log("DB Connected")
})