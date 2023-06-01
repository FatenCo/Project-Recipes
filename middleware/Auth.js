const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send("access denied ...");
  }

  try {
    const decodedToken = jwt.verify(token, "privateKey");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(400).send("worning token ...");
  }
};
