// -------- CONFIG ---------------------------
require("dotenv").config();
require("./config/mongoose");
// -------------------------------------------

// -------- Libs Import --------------------
const express = require("express");
const bodyParser = require("body-parser");
// -----------------------------------------


// ---------Custom Middleware Import-------
const injectModel = require("./middleware/injectModel");
const sessionParser = require("./middleware/sessionParser");
// ----------------------------------------
// -------- Routes Import ------------------
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
// -----------------------------------------
const app = express();

// ----------Pre Route Middleware ----------
app.use(bodyParser.json())
app.use(injectModel("User"))
app.use(sessionParser)
//------------------------------------------

// ----------Routers -----------------------
app.use("/auth", authRouter.router)
app.use("/users", usersRouter.router)
// -----------------------------------------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Form Manager API active on port: ${port}`);
})