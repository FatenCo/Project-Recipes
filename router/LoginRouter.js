const express = require("express");
const routerLogin = express.Router();

const { login } = require("../controller/LoginController");

routerLogin.post("/login", login);

module.exports = routerLogin;
