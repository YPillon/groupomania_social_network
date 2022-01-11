const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const userRole = decodedToken.userRole;
    req.auth = { userId, userRole };
    console.log("OK!");
    next();
  } catch (error) {
    res.status(403).json({ error: error | "Requête non authentifiée" });
  }
};
