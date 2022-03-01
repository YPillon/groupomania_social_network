const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_config");
const bcrypt = require("bcrypt");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "employee",
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

sequelize
  .sync(/*{ alter: true }*/)
  .then(() =>
    console.log("Tables Users, Posts et Comments créées ou déjà existantes !")
  )
  //Création de l'admin ou vérification de son existance
  .then(() => {
    bcrypt.hash("1234", 10).then((hash) => {
      User.findOrCreate({
        where: {
          role: "admin",
        },
        defaults: {
          email: "admin@admin.com",
          password: hash,
        },
      })
        .then(() => console.log("Admin existant!"))
        .catch((error) => console.log(error));
    });
  })
  .catch((err) => console.log(err));

module.exports = User;
