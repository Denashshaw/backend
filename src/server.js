const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const port = 5000 || process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", require("./router/goalsRouter"));
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on " + port);
});
