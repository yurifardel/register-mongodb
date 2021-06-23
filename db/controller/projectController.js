const express = require("express");
const authMiddleware = require("../../src/middleware/auth");
const Projeto = require("../models/project");
const Task = require("../models/task");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (request, response) => {
  try {
    const projeto = await Projeto.find().populate("user");

    return response.send({ projeto });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:projectId", async (request, response) => {
  try {
    const projeto = await Projeto.findById(request.params.projectId).populate(
      "user"
    );

    return response.send({ projeto });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (request, response) => {
  try {
    const { title, description, tasks } = request.body;
    const projeto = await Projeto.create({
      title,
      description,
      user: request.userId,
    });

    tasks.map((task) => {
      const projetoTask = new Task({ ...task, projeto: projeto._id });

      projetoTask.save().then((task) => projeto.tasks.push(task));
    });

    await projeto.save();

    return response.send({ projeto });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:projectId", async (request, response) => {
  try {
    return response.send({ user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:projectId", async (request, response) => {
  try {
    await Projeto.findByIdAndRemove(request.params.projectId).populate("user");

    return response.send({ success: "Tarefa deletada com sucesso" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = (app) => app.use("/project", router);
