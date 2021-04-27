const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("../db/controller/authController")(app);

app.listen(3333, () => {
  console.log("express listen in port 3333");
});
