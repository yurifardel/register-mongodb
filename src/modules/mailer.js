const nodemailer = require("nodemailer");
const jsonConfigMailer = require("../../lib/config/mailer.json");
const hbs = require("nodemailer-express-handlebars");

const { host, pass, port, user } = jsonConfigMailer;

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

transport.use("compile", hbs({}));

module.exports = transport;
