const Post = require("./Post");
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("groupomania", "groupomania_user", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

class Comment extends Model {}
Comment.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  }
);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Comment.sync()
  .then(() => console.log("Table Comments créée ou déjà existante !"))
  .catch((err) => console.log(err));

module.exports = Comment;
