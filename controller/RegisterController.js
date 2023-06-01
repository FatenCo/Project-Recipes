const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, UserValidate } = require("../model/User");

exports.AddUser = async (req, res, next) => {
  const { error } = UserValidate(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(404).send("user is exists in database");
  }
  try {
    const user = new User(_.pick(req.body, ["fullname", "email", "password","isAdmin"]));

    const salRounds = 10;
    const salt = await bcrypt.genSalt(salRounds);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.getToken(); 
    res
      .header("auth-token", token)
      .send(_.pick(user, ["_id", "fullname", "email","isAdmin"]));
  } catch (error) {
    res.status(500).send(error);
  }
};
