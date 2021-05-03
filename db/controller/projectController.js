const express = require("express");
const authMiddleware = require("../../src/middleware/auth");

const router = express.Router();

router.use(authMiddleware);

router.get("/", (request, response) => {
  return response.send({ ok: true });
});

module.exports = (app) => app.use("/project", router);
