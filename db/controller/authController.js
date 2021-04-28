const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (request, response) => {
  const { email } = request.body;

  try {
    if (await User.findOne({ email }))
      return response.status(400)({ error: "user already exists" });

    const user = User.create(request.body);

    user.password = undefined;
    user.then((Users) => {
      return response.send({ Users });
    });
  } catch (err) {
    return response.status(400).send({ error: "Registration failed" });
  }
});

module.exports = (app) => app.use("/auth", router);
