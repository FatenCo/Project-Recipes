const express = require("express");
const routerRecette = express.Router();
const upload = require("../middleware/Uploade");
const Auth = require("../middleware/Auth");

const {
  getRecette,
  showRecette,
  addRecette,
  updateRecette,
  deleteRecette,
} = require("../controller/RecetteController");

 
routerRecette.get("/getRecette", Auth, getRecette);

routerRecette.get("/showRecette", Auth, showRecette);

routerRecette.post("/add", Auth, upload.single("avatar"), addRecette);
 
routerRecette.put("/update/:id", Auth, upload.single("avatar"), updateRecette);

routerRecette.delete("/delete/:id", Auth, deleteRecette);

module.exports = routerRecette;
