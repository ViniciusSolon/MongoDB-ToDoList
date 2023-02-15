const mongoose = require("mongoose");
//criando um esquema, visto que o mongo n tem um definido
const checklistSchema = mongoose.Schema({
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Checklist", checklistSchema);
