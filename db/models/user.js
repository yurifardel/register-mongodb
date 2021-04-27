const mongoose = require("../db");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  password: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
