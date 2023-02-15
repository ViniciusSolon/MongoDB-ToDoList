const express = require("express");
const checklist = require("../models/checklist");

const router = express.Router();

const Checklist = require("../models/checklist");

/*criando nova rota get
router.get("/", (req, res) => {
  console.log("Olá");
  res.send();
});*/
//Listando dados do model
router.get("/", async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    //passando uma variavel para minha view com uma listagem de checklist
    res.status(200).render("checklists/index", { checklist: checklist });
  } catch (error) {
    //res.status(500).json(error);
    res
      .status(200)
      .render("pages/error", { error: "error ao exibir as listas" });
  }
});

//Rota new
router.get("/new", async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render("checklists/new", { checklist: checklist });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "Error ao carregar o formulario" });
  }
});

//Metodo put atualizar
router.get("/:id/edit", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render("checklists/edit", { checklist: checklist });
  } catch (error) {
    res.status(200).render("pages/error", {
      error: "error ao exibir a edição de listas de tarefas",
    });
  }
});
//criando rota post
router.post("/", async (req, res) => {
  //dessa forma
  const { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect("/checklists");
  } catch (error) {
    res
      .status(200)
      .render("checklists/new", { checklist: { ...checklist, error } });
  }

  /*ou dessa pegar so o name
  console.log(req.body["name"]);
  */
});

/*Parametros nas rotas, devolvendo o id q foi passado pra ele(no postman)
router.get("/:id", (req, res) => {
  console.log(req.body["name"]);
  res.send(`ID: ${req.params.id}`);
});*/

//Listando dados moveis por Id
router.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate("tasks");
    res.status(200).render("checklists/show", { checklist: checklist });
  } catch (error) {
    res
      .status(200)
      .render("pages/error", { error: "error ao exibir as listas de tarefas" });
  }
});

/*Rota put atualizar
router.put("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`PUT ID: ${req.params.id}`);
});*/

//atualizar dados
router.put("/:id", async (req, res) => {
  let { name } = req.body.checklist;

  try {
    let checklist = await Checklist.findByIdAndUpdate(req.params.id, { name });
    res.redirect("/checklists");
  } catch (error) {
    let errors = error.errors;
    res
      .status(422)
      .render("checklists/edit", { checklist: { ...checklist, errors } });
  }
});
/*Rota delete deletar
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(`Delete ID: ${req.params.id}`);
});*/

router.delete("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id);
    res.redirect("/checklists");
  } catch (error) {
    res.status(200).render("pages/error", {
      error: "error ao deletas as listas de tarefas",
    });
  }
});
module.exports = router;
