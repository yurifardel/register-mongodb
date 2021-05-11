const mongoose = require("mongoose");

const RegistroSchema = new mongoose.Schema({
  registros: {
    type: [],
  },
  pagina: {
    type: Number,
    requered: true,
  },
});

module.exports = mongoose.model("Registro", RegistroSchema);
