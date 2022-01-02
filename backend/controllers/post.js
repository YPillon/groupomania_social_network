const Post = require("../models/Post");

exports.getAllPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json(err));
};

exports.createPost = (req, res, next) => {
  const post = Post.build({
    userId: req.body.userId,
    title: req.body.title,
    imageUrl: "uneUrl"
    /*`${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`*/,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post publié avec succès !" }))
    .catch((err) => res.status(501).json(err));
};


