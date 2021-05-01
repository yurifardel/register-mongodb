const mogoose = require("mongoose");

mogoose.connect("mongodb://localhost/noderest", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mogoose.Promise = global.Promise;

module.exports = mogoose;
