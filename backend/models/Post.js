const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_config");
const User = require("./User");

class Post extends Model {}
Post.init(
  {
    userId: {
      type: DataTypes.INTEGER,
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
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);


/*const UserDislikedPosts = sequelize.define(
  "UserDislikedPosts",
  {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'Movies' would also work
        key: "id",
      },
    },
    PostId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post, // 'Actors' would also work
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);*/

/*User.belongsToMany(Post, { through: "UserPosts" });
Post.belongsToMany(User, { through: "UserPosts" });*/

/*User.belongsToMany(Post, {
  as: "UserDisliked",
  foreignKey: "UserDislikedId",
  through: "UserDislikedPosts",
});
Post.belongsToMany(User, { through: "UserDislikedPosts" });*/


module.exports = Post;
