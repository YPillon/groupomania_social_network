const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/api/posts", postCtrl.createPost);
router.get("/api/posts", postCtrl.getAllPosts);
router.get("/api/posts/:postId", postCtrl.getOnePost);
router.put("/api/posts/:postId", auth, postCtrl.modifyPost);
router.delete("/api/posts/:postId", auth, postCtrl.deletePost);

router.post("/api/posts/:postId/comments", postCtrl.createComment);
router.get("/api/posts/:postId/comments", postCtrl.getComments);
router.delete(
  "/api/posts/:postId/comments/:commentId",
  auth,
  postCtrl.deleteComment
);

router.post("/api/posts/:postId/like", postCtrl.likeAndDislike);
router.post("/api/posts/:postId/like2", postCtrl.likeAndDislike2);

module.exports = router;
