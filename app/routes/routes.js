module.exports = (app) => {
    const Task = require("../controllers/task.controller.js");

    app.post("/task", Task.create);

    app.get("/task", Task.getAll);

    app.get("/task/:taskId", Task.find);

    app.put("/task/:taskId", Task.update);

    app.delete("/task/:taskId", Task.delete);
};
