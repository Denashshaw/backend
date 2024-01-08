const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

router.get("/", auth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
