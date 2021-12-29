const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res) => {
  console.log("The answer is: " + req.body.email);
  res.status(207).json({ message: "GOOD" });
};
