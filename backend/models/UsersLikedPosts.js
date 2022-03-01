const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_config");
const User = require("./User");
const Post = require("./Post");

class UsersLikedPosts extends Model {}
UsersLikedPosts.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

UsersLikedPosts.belongsTo(Post, { foreignKey: "PostId", onDelete: "CASCADE" });
UsersLikedPosts.belongsTo(User, { foreignKey: "UserId", onDelete: "CASCADE" });
module.exports = UsersLikedPosts;
