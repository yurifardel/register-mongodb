const nodemailer = require("nodemailer");
const jsonConfigMailer = require("../../lib/config/mail.json");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const {
  host,
  pass,
  port,
  user
} = jsonConfigMailer;

const transport = nodemailer.createTransport({
  host,
  port,
  auth: {
    user,
    pass,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: "handlebars",
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html",
  })
);

module.exports = transport;