const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("groupomania", "groupomania_user", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

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

User.sync()
  .then(() => console.log("Table Users créée ou déjà existante !"))
  //Création de l'admin ou vérification de son existance
  .then(() => {
    bcrypt.hash(JSON.stringify("1234"), 10).then((hash) => {
      User.findOrCreate({
        where: {
          role: "admin",
        },
        defaults: {
          email: JSON.stringify("admin@admin.com"),
          password: hash,
        },
      })
        .then(() => console.log("Admin existant!"))
        .catch((error) => console.log(error));
    });
  })
  .catch((err) => console.log(err));

module.exports = User;
