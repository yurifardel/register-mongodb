const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  return response.send({ ok: true });
});

module.exports = (app) => app.use("/project", router);
