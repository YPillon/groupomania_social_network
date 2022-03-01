const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.post("/api/posts", auth, multer, postCtrl.createPost);
router.get("/api/posts", auth, postCtrl.getAllPosts);
router.get("/api/posts/:postId", auth, postCtrl.getOnePost);
router.put("/api/posts/:postId", auth, multer, postCtrl.modifyPost);
router.delete("/api/posts/:postId", auth, postCtrl.deletePost);

router.post("/api/posts/:postId/comments", auth, postCtrl.createComment);
router.get("/api/posts/:postId/comments", auth, postCtrl.getComments);
router.delete(
  "/api/posts/:postId/comments/:commentId",
  auth,
  postCtrl.deleteComment
);

router.post("/api/posts/:postId/like", auth, postCtrl.likeAndDislike);
router.get("/api/posts/:postId/like", auth, postCtrl.checkLikeOrDislike)

module.exports = router;
