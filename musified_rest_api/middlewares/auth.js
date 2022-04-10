const { verifySession } = require("../services/users");

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization']; // TODO: check if ok header to be all lower case
    try {
        if (token) {
            const userData = verifySession(token);
            req.user = userData;
        }
        next();
    } catch (error) {
        console.error(error.message);
        res.status(498).json({ message: 'Invalid access token' }); // TODO: check what is the correct status code for invalid token

    }
}