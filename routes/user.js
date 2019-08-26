const router = require("express").Router();
const injectModel = require("../middleware/injectModel");
const authRequired = require("../middleware/authRequired");

const createUser = async (req, res, next) => {
    try {
        const user = req.construct.user;
        await user.validate()
        await user.hashPassword();
        await user.save();
        res.sendStatus(200);
    } catch(e) {
        next(e);
    }
}

const getUser = async (req, res, next) => {
    res.json(req.user);
}

const deleteUser = async (req, res, next) => {
    try {
        await req.user.delete()
        res.sendStatus(200)
    } catch (e) {
        next(e)
    } 
}

router.post("/", injectModel("User", true), createUser);
router.get("/", authRequired, getUser)
router.delete("/", authRequired, deleteUser)

module.exports = {router, createUser, getUser, deleteUser};