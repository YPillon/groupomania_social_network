const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db_config");

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
    //Future implémentation de like et dislike
    /*likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    disLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },*/
  },
  {
    sequelize,
    timestamps: false,
  }
);

//Future implémentation de like et dislike
/*class UserPosts extends Model {}
UserPosts.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);*/

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
