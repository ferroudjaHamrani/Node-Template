const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../../models/user");

module.exports = async function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

  // Suppression du préfixe "Bearer " si présent
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).send({ message: "User does not exist" });

    req.user = user;
    next();
  } catch (ex) {
    res.status(400).send({ message: "Invalid token." });
  }
};
