const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require("../db/controller/authController")(app);
// require("../db/controller/projectController")(app);

require("../db/controller/index")(app);

app.listen(3333, () => {
  console.log("express listening at port 3333");
});
