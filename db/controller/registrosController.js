const express = require("express");
const router = express.Router();

const modelUser = require("../models/User");
const modelRegistros = require("../models/Registros");

router.post("/create", async (req, res) => {
  try {
    await modelRegistros.create({
      pagina: 1,
      registros: [],
    });

    res.status(200).send({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "not found" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const user = modelUser.find().limit(3);

    const userPromiseReturn = user.then(async (user) => {
      // const ids = user.map((id) => {
      //   console.log(id.id);

      //   return id.id;
      // });

      await modelRegistros.update({
        registros: user,
      });

      const findRegister = await modelRegistros
        .find()
        .sort({ _id: 1 })
        .limit(1)
        .skip(page * 5)
        .select(["+*"]);

      return res.status(200).send(findRegister);
    });

    return userPromiseReturn;
  } catch (err) {
    console.log(err);
    res.status(400).send(TypeError("not found"));
  }
});

router.get("/list", async (req, res) => {
  const { page = 1 } = req.query;

  const register = await modelRegistros.limit();

  console.log(register);

  return res.status(200).send(register);
});

module.exports = (app) => app.use("/register", router);
