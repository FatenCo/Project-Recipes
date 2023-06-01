const express = require("express");
const routerProfile = express.Router();
const upload = require("../middleware/Uploade");
const Auth = require("../middleware/Auth");

const { addProfile, showProfile, updateProfile } = require("../controller/ProfileController");

/**
 * Router show profile user information 
 */
routerProfile.get("/showProfile", Auth ,showProfile);

/**
 * Router add profile user ...
 */
routerProfile.post("/add", Auth ,upload.single("avatar"),addProfile);
//upload.any("avatar")

/**
 * Router update profile user ...
 */
routerProfile.put("/update", Auth ,upload.single("avatar"),updateProfile);


module.exports = routerProfile;
