const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.replace("Bearer ", "");
            const user = await User.findOne({ token: token });
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = isAuthenticated;