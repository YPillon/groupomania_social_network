const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");
const UsersLikedPosts = require("../models/UsersLikedPosts");

exports.createPost = (req, res, next) => {
  const post = Post.build({
    userId: req.body.userId,
    title: req.body.title,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
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
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: "No such Post!",
        });
      } else if (
        post.userId !== req.auth.userId &&
        req.auth.userRole !== "admin"
      ) {
        res.status(403).json({
          error: "Unauthorized request!",
        });
      } else if (req.file) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(path.join(__dirname, `../images/${filename}`), (err) => {
          if (err) throw err;

          const postToUpdate = post;
          postToUpdate
            .update({
              title: req.body.title,
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            })
            .then(() => res.status(200).json("Post modifié avec succès !"))
            .catch((error) => res.status(501).json(error));
        });
      } else if (!req.file) {
        const postToUpdate = post;
        postToUpdate
          .update({
            title: req.body.title,
          })
          .then(() =>
            res
              .status(201)
              .json("Post modifié avec succès sans changer l'image !")
          )
          .catch((error) => res.status(501).json(error));
      }
    })
    .catch((error) => res.status(502).json({ error }));
};

exports.deletePost = (req, res) => {
  Post.findOne({ where: { id: req.params.postId } })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: "No such Post!",
        });
      }
      if (post.userId !== req.auth.userId && req.auth.userRole !== "admin") {
        res.status(403).json({
          error: "Unauthorized request!",
        });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(path.join(__dirname, `../images/${filename}`), (err) => {
          if (err) throw err;

          const postToDelete = post;
          postToDelete
            .destroy()
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(501).json({ error: error }));
};

exports.createComment = (req, res) => {
  User.findByPk(req.body.userId)
    .then((user) => {
      Comment.create({
        userId: req.body.userId,
        userEmail: user.email,
        text: req.body.text,
        PostId: req.params.postId,
      })
        .then(() => res.status(201).json("Commentaire publié avec succès"))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(404).json({ error: error }));
};

exports.getComments = (req, res) => {
  Comment.findAll({ where: { postId: req.params.postId } })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.deleteComment = (req, res) => {
  Comment.findByPk(req.params.commentId)
    .then((comment) => {
      if (!comment) {
        res.status(404).json({
          error: "No such Comment!",
        });
      }
      if (comment.userId !== req.auth.userId && req.auth.userRole !== "admin") {
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

//Fonction de like et dislike
exports.likeAndDislike = (req, res) => {
  UsersLikedPosts.findOne({
    where: { PostId: req.params.postId, UserId: req.auth.userId },
  })
    .then((association) => {
      //Cas où il n'y a encore ni like ni dislike
      if (!association) {
        console.log("No such Combination!");
        if (req.body.likeValue === 1 || req.body.likeValue === -1) {
          UsersLikedPosts.create({
            PostId: req.params.postId,
            UserId: req.auth.userId,
            value: req.body.likeValue,
          })
            .then(() => {
              Post.findOne({ where: { id: req.params.postId } })
                .then((post) => {
                  const likeValue = req.body.likeValue;
                  if (likeValue === 1) {
                    post.likes++;
                  } else if (likeValue === -1) {
                    post.dislikes++;
                  }
                  post
                    .save()
                    .then(() => res.status(201).json("Like/dislike enregistré"))
                    .catch((err) => res.status(408).json(err));
                })
                .catch((err) => res.status(408).json(err));
            })
            .catch((err) => res.status(407).json(err));
        } else if (req.body.likeValue == "Hello") {
          res.sendStatus(600);
        } else {
          res.status(401).json("Mauvaise valeur");
        }
      }
      //Cas où il y a déja un like ou un dislike
      else {
        console.log("Like existant");
        Post.findOne({ where: { id: req.params.postId } })
          .then((post) => {
            if (association.value === req.body.likeValue) {
              res.status(400).json("Opération impossible");
            } else if (req.body.likeValue === 1 || req.body.likeValue === -1) {
              req.body.likeValue === 1
                ? (post.likes++, post.dislikes--)
                : (post.dislikes++, post.likes--);
              post
                .save()
                .then(() => {
                  association
                    .update({ value: req.body.likeValue })
                    .then(() => res.status(202).json("Updated!"))
                    .catch((err) => res.status(400).json(err));
                })
                .catch((err) => res.status(400).json(err));
            } else if (req.body.likeValue === 0) {
              association.value === 1 ? post.likes-- : post.dislikes--;
              post
                .save()
                .then(() => {
                  association
                    .destroy()
                    .then(() => res.status(200).json("Removed!"))
                    .catch((err) => res.status(401).json(err));
                })
                .catch((err) => res.status(400).json(err));
            } else {
              res.status(402).json("Mauvaise valeur");
            }
          })
          .catch((err) => res.status(400).json(err));
      }
    })
    .catch((err) => res.status(400).json(err));
};

exports.checkLikeOrDislike = (req, res) => {
  UsersLikedPosts.findAll({
    where: { UserId: req.auth.userId, PostId: req.params.postId },
  })
    .then((post) => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => res.status(400).json(err));
};
