const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = (req, res) => {
  bcrypt
    .hash(JSON.stringify(req.body.password), 10)
    .then((hash) => {
      async function createUser() {
        try {
          const user = await User.create({
            email: JSON.stringify(req.body.email),
            password: hash,
          });
          res.status(201).json("Utilisateur créé avec succès !");
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
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    bcrypt
      .compare(JSON.stringify(req.body.password), user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(403).json({ error: "Mot de passe incorrect !" });
        }
        res.status(200).json({
          userId: user.id,
          userRole: user.role,
          token: jwt.sign(
            { userId: user.id, userRole: user.role },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),
        });
      })
      .catch((error) => res.status(570).json({ error: error }));
  });
};

exports.deleteAccount = (req, res) => {
  User.findOne({ where: { id: req.params.userId } }).then((user) => {
    if (!user) {
      res.status(404).json({
        error: "No such User!",
      });
    }
    if (user.id !== req.auth.userId) {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    } else {
      const userToDelete = user;
      userToDelete
        .destroy()
        .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};
