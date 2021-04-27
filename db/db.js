const mogoose = require("mongoose");

mogoose.connect("mongodb://localhost/noderest", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mogoose.Promise = global.Promise;

module.exports = mogoose;
