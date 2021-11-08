const Task = require("../models/Task");

const taskAccess = async (req, res, next) => {
    let task;

    try {
        task = await Task.findOne({
            user: req.user._id,
            _id: req.params.id
        });
    } catch (e) {
        return res.sendStatus(500);
    }

    if (!task) {
        return res.status(404).send({error: 'Task is not found'});
    }

    next();
};

module.exports = taskAccess;