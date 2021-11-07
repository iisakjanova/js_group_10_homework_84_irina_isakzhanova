const User = require("../models/User");

const auth = async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    let user;

    try {
        user = await User.findOne({token});
    } catch (e) {
        return res.sendStatus(500);
    }

    if (!user) {
        return res.status(401).send({error: 'Wrong token'});
    }

    req.user = user;

    next();
};

module.exports = auth;