const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    description: String,
    completed: Boolean
});

module.exports = mongoose.model("Task", TaskSchema);
