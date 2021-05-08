const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  pagina: {
    type: Number,
  },
  registros: {
    type: [],
  },
});

module.exports = mongoose.model("Page", PageSchema);
