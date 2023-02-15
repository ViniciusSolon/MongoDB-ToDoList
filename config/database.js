const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost/todo-list", {
    useNewUrlParser: true,
    useUnifiedTopoLogy: true,
  })
  .then(() => console.log("conectando ao mongoDB"))
  .catch((err) => console.error(err));
