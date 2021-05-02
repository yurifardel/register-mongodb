const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../lib/config/auth.json");

const User = require("../models/User");

const router = express.Router();

function generationToken(params = {}) {
  const token = jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });

  return token;
}

router.post("/register", async (request, response) => {
  const { email } = request.body;

  try {
    if (await User.findOne({ email }))
      return response.status(400)({ error: "user already exists" });

    const user = User.create(request.body);
    // user.password = undefined;

    const dataPromise = user.then((user) => {
      user.password = undefined;
      response.send({ user, token: generationToken({ id: user.id }) });
    });

    return dataPromise;
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

  const passwordCovertToString = password.toString();

  if (!(await bcrypt.compare(passwordCovertToString, user.password))) {
    return response.status(400).send({ error: "invalid password" });
  }

  // const token = jwt.sign({ id: user.id }, authConfig.secret, {
  //   expiresIn: 86400,
  // });

  user.password = undefined;

  response.send({ user, token: generationToken({ id: user.id }) });
});

module.exports = (app) => app.use("/auth", router);
