const mongoose = require("mongoose");
//criando um esquema, visto que o mongo n tem um definido
const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Checklist",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
