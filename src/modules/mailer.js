const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "847f719fd9466b",
    pass: "f5dd24a59ff26c",
  },
});
