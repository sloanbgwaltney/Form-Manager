const userModel = require("../models/user");
const formModel = require("../models/form");

module.exports = (key, construct) => (req, res, next) => {
    req.models = {}
    req.construct = {}
    switch (key) {
        case "User":
            req.models.user = userModel;
            if (construct) {
                req.construct.user = new req.models.user(req.body);
            }
            return next();
        case "Form":
            req.models.form = formModel;
            if (construct) {
                req.construct.form = new req.models.form(req.body);
            }
            return next();
        default:
            return next();
    }
}