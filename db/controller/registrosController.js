const express = require("express");
const router = express.Router();

const modelUser = require("../models/User");
const modelRegistros = require("../models/Registros");

router.post("/", async (req, res) => {
  const user = modelUser.find();

  const userPromiseReturn = user.then(async (user) => {
    await modelRegistros.update({
      registros: { user },
    });
    return res.status(200).send({ success: "ok" });
  });

  return userPromiseReturn;
});

module.exports = (app) => app.use("/registros", router);
