const asyncHandler = require("express-async-handler");
const Goals = require("../models/goalmodels");

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goals.find();
  res.status(200).json(goals);
});

const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Goals field is required");
  }

  const goal = await Goals.create({ text: req.body.text });
  res.status(201).json(goal);
});

const putGoals = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goals.findById(req.params.id);
  if (!goal) {
    res.status(404).json({ error: "Goal not Found" });
  }
  await Goals.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ message: "Goal deleted successfuly " + req.params.id });
});

module.exports = {
  getGoals,
  postGoals,
  putGoals,
  deleteGoals,
};
