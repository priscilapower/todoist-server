const Task = require("../models/task.js");

// Create and Save a new Message
exports.create = (req, res) => {
    const task = new Task({
        description: req.body.description,
        completed: req.body.completed ?? false
    });
    task
        .save()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task.",
            });
        });
};

// Retrieve all messages from the database.
exports.getAll = (req, res) => {
    Task.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages.",
            });
        });
};

// Find a single message with a messageId
exports.find = (req, res) => {
    Task.findById(req.params.taskId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving task with id " + req.params.taskId,
            });
        });
};

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
    Task.findByIdAndUpdate(
        req.params.taskId,
        {
            description: req.body.description,
            completed: req.body.completed
        },
        { new: true }
    )
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            return res.status(500).send({
                message: "Error updating task with id " + req.params.taskId,
            });
        });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then((data) => {
            if (!data) {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            res.send({ message: "Task deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Task not found with id " + req.params.taskId,
                });
            }
            return res.status(500).send({
                message: "Could not delete task with id " + req.params.taskId,
            });
        });
};
