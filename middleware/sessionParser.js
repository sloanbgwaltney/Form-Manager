
async function middleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {return next()}
        const authSplit = authHeader.split(" ")
        if (authSplit.length !== 2 || authSplit[0] !== "Bearer") {return next()}
        const user = await req.models.user.findOne({'session._id': authSplit[1]})
        if (!user) {return next()}
        req.user = user;
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = middleware