const { Sequelize, DataTypes, Model } = require("sequelize");

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

User.sync({ alter: true })
  .then(() => console.log("Table Users créée ou déjà existante !"))
  .catch((err) => console.log(err));

module.exports = User;
