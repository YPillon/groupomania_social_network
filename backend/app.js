const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Model } = require("sequelize");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const sequelize = new Sequelize("groupomania", "groupomania_user", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

app.use(bodyParser.json());

try {
  sequelize
    .authenticate()
    .then(() => console.log("Connecté à la base de données MySQL!"))
    .catch((err) => console.log(err));
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, 'images')));
app.use("/", userRoutes);
app.use("/", postRoutes);

module.exports = app;
