const express = require("express");
const authMiddleware = require("../../src/middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", (request, response) => {
  try {
    return response.send({ ok: true, user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:projectId", async (request, response) => {
  try {
    return response.send({ user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (request, response) => {
  try {
    return response.send({ user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:projectId", async (request, repsonse) => {
  try {
    return response.send({ user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:projectId", async (request, repsonse) => {
  try {
    return response.send({ user: request.userId });
  } catch (err) {
    console.log(err);
  }
});

module.exports = (app) => app.use("/project", router);
