// -------- CONFIG ---------------------------
require("dotenv").config();
require("./config/mongoose");
// -------------------------------------------

// -------- Libs Import --------------------
const express = require("express");
const bodyParser = require("body-parser");
// -----------------------------------------

// -------- Routes Import ------------------
const usersRouter = require("./routes/user");
// -----------------------------------------
const app = express();

// ----------Pre Route Middleware ----------
app.use(bodyParser.json())
//------------------------------------------

// ----------Routers -----------------------
app.use("/users", usersRouter.router)
// -----------------------------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Form Manager API active on port: ${port}`);
})