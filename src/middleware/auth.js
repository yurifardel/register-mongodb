const jwt = require("jsonwebtoken");
const authConfig = require("../../lib/config/auth.json");

module.exports = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "no token provided" });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return response.status(401).send({ error: "token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({ error: "token malformatted" });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return response.status(401).send({ error: "token invalid" });
    }

    request.userId = decoded.userId;
    return next();
  });
};
