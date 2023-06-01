const bcrypt = require("bcrypt"); 
const { User, LoginUser  } = require("../model/User");

exports.login = async (req, res, next) => {
  const { error } = LoginUser(req.body);

  if (error) {
    return res.send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send("Invalid email address or password .");
  }

  const verifPass = await bcrypt.compare(req.body.password, user.password);
  if (!verifPass) {
    return res.status(404).send("Invalid email address or password .");
  }
  const token = user.getToken();
  res.status(200).send({ message: "Login with Success! ", token: token });
};
