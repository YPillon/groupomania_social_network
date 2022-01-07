const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/api/auth/signup", userCtrl.signup);
router.post("/api/auth/login", userCtrl.login);
router.get("/api/users/:userId", userCtrl.getUserEmail);
router.delete("/api/auth/:id", auth, userCtrl.deleteAccount);

module.exports = router;
