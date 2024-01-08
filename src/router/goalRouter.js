const express = require("express");
const {
  getGoals,
  postGoals,
  putGoals,
  deleteGoals,
} = require("../controllers/goalController");
const { auth } = require("../middleware/authMiddleware");
const router = express.Router();

// router.get('/', getGoals)
// router.post('/', postGoals)
router.route("/").get(auth, getGoals).post(auth, postGoals);
router.route("/:id").put(auth, putGoals).delete(auth, deleteGoals);

module.exports = router;
