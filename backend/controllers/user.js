const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      async function createUser() {
        try {
          const user = await User.create({
            email: JSON.stringify(req.body.email),
            password: hash,
          });
          res.status(201).send("Utilisateur créé avec succès !");
        } catch (err) {
          res.status(400).send(err);
        }
      }
      createUser();
    })
    .catch((error) => res.status(501).json({ message: error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: { email: JSON.stringify(req.body.email) },
  }).then((user) => {
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(403).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user.id,
          token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          }),
        });
      })
      .catch((err) => res.status(500).json({ message: error }));
  });
};
