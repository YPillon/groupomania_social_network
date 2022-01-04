const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.createPost = (req, res, next) => {
  console.log(req.body);
  const post = Post.build({
    userId: req.body.userId,
    title: req.body.title,
    imageUrl: "uneUrl",
    /*`${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`*/
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post publié avec succès !" }))
    .catch((error) => res.status(501).json(error));
};

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json(error));
};

exports.getOnePost = (req, res) => {
  Post.findByPk(req.params.postId)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json(error));
};

exports.modifyPost = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } }).then((post) => {
    if (!post) {
      res.status(404).json({
        error: "No such Post!",
      });
    }
    if (post.userId !== req.auth.userId) {
      res.status(403).json({
        error: "Unauthorized request!",
      });
    } else {
      const postToUpdate = post;
      postToUpdate
        .update({ title: req.body.title, imageUrl: req.body.imageUrl })
        .then(() =>
          res.status(200).json({ message: "Post modifié avec succès !" })
        )
        .catch((error) => res.status(501).json(error));
    }
  });
};

exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: "No such Post!",
        });
      }
      if (post.userId !== req.auth.userId) {
        res.status(403).json({
          error: "Unauthorized request!",
        });
      } else {
        const postToDelete = post;
        postToDelete
          .destroy()
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.createComment = (req, res) => {
  Comment.create({
    userId: req.body.userId,
    text: req.body.text,
    PostId: req.params.postId,
  })
    .then(() => res.status(201).json("Commentaire publié avec succès"))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getComments = (req, res) => {
  Comment.findAll({ where: { postId: req.params.postId } })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deleteComment = (req, res) => {
  console.log(req.params.commentId);
  Comment.findByPk(req.params.commentId)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({
          error: "No such Comment!",
        });
      }
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({
          error: "Unauthorized request!",
        });
      } else {
        Comment.destroy({ where: { id: req.params.commentId } })
          .then(() => res.status(200).json("Commentaire supprimé !"))
          .catch((error) => res.status(400).json({ error: error }));
      }
    })
    .catch((error) => res.status(501).json({ error: error }));
};

exports.likeAndDislike = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((postData) => {
      const post = postData;
      async function howManyUsers() {
        console.log(await post.countUsers());
      }
      howManyUsers();
      res.sendStatus(200);
    })
    .catch((error) => res.status(507).json(error));
};

exports.likeAndDislike2 = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((postData) => {
      const thisPost = postData;

      async function didThisUserLiked(thisPost) {
        const thisUser = await User.findOne({ where: { id: req.body.userId } });
        console.log(thisUser);
      }
      didThisUserLiked(thisPost);
    })
    .catch((error) => res.status(507).json(error));
};
