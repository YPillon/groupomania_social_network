const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("groupomania", "groupomania_user", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

class Publication extends Model {}
Publication.init(
  {
    userId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Publication;
