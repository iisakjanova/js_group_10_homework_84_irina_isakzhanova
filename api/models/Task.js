const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        default: 'new',
        enum: ['new', 'in_progress', 'complete'],
    },
});

TaskSchema.plugin(idValidator);
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;