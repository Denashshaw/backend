const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = 5000 || process.env.NODE_ENV;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./router/goalsRouter"));
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on " + port);
});
