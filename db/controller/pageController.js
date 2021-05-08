const express = require("express");

const User = require("../models/User");
const Page = require("../models/Page");

const router = express.Router();

router.post("/", async (request, response) => {
  const { pagina = 1 } = request.body;

  const user = await User.find().select("+*");

  console.log(user);

  const page = Page.create({
    pagina,
    registros: user,
  });

  return response.status(200).send(page);
});

module.exports = (app) => app.use("/page", router);
