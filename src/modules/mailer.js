const nodemailer = require("nodemailer");
const json = require("../../lib/config/mailer.json");

const { host, pass, port, user } = json;

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports = transport;
