const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const express = require("express");
const auth = require("./routes/auth");
var cors = require("cors");
const app = express();

mongo_uri = process.env.MONGODB_URI;

mongoose
  .connect(mongo_uri)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch(err => console.error("Something went wrong", err));

app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/tasks", tasks);
app.use("/", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
