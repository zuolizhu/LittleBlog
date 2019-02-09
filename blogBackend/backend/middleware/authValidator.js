const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "secret_key_for_dev_only");
        next();
    } catch(err) {
        res.status(401).json({
            message: "401 Bad Token, Action not allowed"
        });
    }
};