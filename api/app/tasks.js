const express = require('express');

const auth = require('../middleware/auth');
const Task = require('../models/Task');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'Data is not valid'});
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

router.put('/:id', auth, async (req, res) => {
    let tasks;

    try {
       tasks = await Task.findOne({
           user: req.user._id,
           _id: req.params.id
       });
    } catch (e) {
        return res.sendStatus(500);
    }

    if (!tasks) {
        return res.status(404).send({error: 'Task is not found'});
    }

    if (!req.body.title) {
        return res.status(400).send({error: 'Data is not valid'});
    }

    const taskData = {
        title: req.body.title,
        description: req.body.description || null,
        status: req.body.status,
    };

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            taskData,
            {new: true},
        );

        res.send(task);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;