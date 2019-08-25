const router = require("express").Router();
const injectModel = require("../middleware/injectModel");

const login = async (req, res, next) => {
    try {
        const user = await req.models.user.findOne({username: req.body.username});
        if (!user || await user.comparePasswords(req.body.password) !== true) {
            return res.status(400).json({message: "Unknow username/password combination"})
        }
        user.createSession();
        await user.save();
        res.set('Authorization', user.session.id)
        return res.sendStatus(200)
    } catch (e) {
        next(e);
    }
}

router.post("/", injectModel("User"), login);

module.exports = {
    router,
    login
};