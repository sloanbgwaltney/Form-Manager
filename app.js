// -------- CONFIG ---------------------------
require("dotenv").config();
require("./config/mongoose");
// -------------------------------------------

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Form Manager API active on port: ${port}`)
})