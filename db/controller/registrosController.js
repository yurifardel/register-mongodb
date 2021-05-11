const express = require("express");
const router = express.Router();

const modelUser = require("../models/User");
const modelRegistros = require("../models/Registros");

router.post("/create", async (req, res) => {
  const { page = 1 } = req.query;

  await modelRegistros.create({
    pagina: page,
    registros: [],
  });

  res.status(200).send();
});

router.post("/update", async (req, res) => {
  try {
    const user = modelUser.find();

    const userPromiseReturn = user.then(async (user) => {
      const ids = user.map((id) => {
        console.log(id.id);
        return id.id;
      });

      console.log(ids.length);

      await modelRegistros.update({
        registros: { user },
      });

      return res.status(200).send({ success: "ok" });
    });

    // return userPromiseReturn;
  } catch (err) {
    console.log(err);
    res.status(400).send(TypeError("not found"));
  }
});

module.exports = (app) => app.use("/register", router);
