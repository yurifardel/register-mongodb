const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema({
  pagina: {
    type: Number,
    requered: true,
  },
  registros: {
    type: [],
  },
});

module.exports = mongoose.model("Registro", RegistroSchema);
