const asyncHandler = require("express-async-handler");

const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Got message from controller" });
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.goals) {
    res.status(400);
    throw new Error("Goals field is required");
  }
  res.status(201).json({ message: req.body.goals });
});

const putGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Put message from controller" });
});

const deleteGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Delete message from controller" });
});

module.exports = {
  getGoals,
  postGoals,
  putGoals,
  deleteGoals,
};
