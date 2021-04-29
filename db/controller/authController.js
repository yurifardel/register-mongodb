const express = require("express");
const bcrypt = require("bcryptjs");

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

router.post("/authenticate", async (request, response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return response.status(400).send({ error: "user not found" });
  }

  console.log(user.password, user.password);

  if (!(await bcrypt.compare(user.password))) {
    return response.status(400).send({ error: "invalid password" });
  }

  return response.send({ user });
});

module.exports = (app) => app.use("/auth", router);
