const jwt = require("jsonwebtoken");
const bcrpt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/usermodels");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    // .json({ error: "All fields are required!" });
    throw new Error("All fields are required!");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists!");
  }

  const salt = await bcrpt.genSalt(10);
  const hashedPassword = await bcrpt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("User not registered! Try again later!");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrpt.compare(password, user.password))) {
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
  res.json({ msg: "user login" });
});

const getUser = asyncHandler(async (req, res) => {
  const { _id, username, email } = await User.findById(req.user.id);
  res.json({
    id: _id,
    username,
    email,
  });
});

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getUser };
