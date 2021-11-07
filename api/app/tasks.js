const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send('Data is not valid');
    }

    const taskData = {
        user: req.user._id,
        title: req.body.title,
        description: req.body.description || null,
        status: req.body.status,
    };

    const task = new Task(taskData);

    try {
        await task.save();
        res.send(task);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user._id});
        res.send(tasks);
    } catch (e) {
        return res.sendStatus(500);
    }
});

module.exports = router;