const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/api/auth/signup", userCtrl.signup);
router.post("/api/auth/login", userCtrl.login);
router.delete("/api/auth/:userId", auth, userCtrl.deleteAccount);

module.exports = router;
