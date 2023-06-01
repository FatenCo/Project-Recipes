const express = require("express");
const routerRegister = express.Router();

const { AddUser } = require("../controller/RegisterController");


routerRegister.post("/register", AddUser);

module.exports = routerRegister;
