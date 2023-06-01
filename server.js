const express = require("express");
const path = require("path");

const app = express();  
const dotenv = require("dotenv").config({ path: "./config/.env" });
require("./config/Connection.js");
const routerRegister = require("./router/RegisterRouter");
const routerLogin = require("./router/LoginRouter"); 
const routerRecette = require("./router/RecetteRouter"); 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Uploads")));




 
app.use("/auth",routerRegister);
   
app.use("/auth", routerLogin); 

app.use("/recette", routerRecette); 



PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
  console.log("connected to port " + PORT + " ...");
});
