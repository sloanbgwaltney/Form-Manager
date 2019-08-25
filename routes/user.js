const router = require("express").Router();
const injectModel = require("../middleware/injectModel");

const createUser = async (req, res, next) => {
    try {
        const user = req.construct.user;
        await user.validate()
        await user.hashPassword();
        await user.save();
        res.sendStatus(200);
    } catch(e) {
        console.log(e)
        next(e);
    }
}

router.post("/", injectModel("User", true), createUser);

module.exports = {router, createUser};