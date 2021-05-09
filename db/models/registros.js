const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema({
  registros: {
    type: [],
  },
});

module.exports = mongoose.model("Registro", RegistroSchema);
