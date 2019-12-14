const { Task, validate } = require("../models/task");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const tokenAuth = require("../middleware/token-auth.js");

// tokenAuth;

router.get("/", tokenAuth, async (req, res) => {
  console.log("Pobieranie taskow dla: " + req.headers.userId);
  try {
    const tasks = await Task.find({ user: req.headers.userId }).sort("content");
    res.send(tasks);
  } catch (e) {
    res.status(500).send("Something failed");
  }
});

router.post("/", tokenAuth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log("Dodawanie taska dla: " + req.headers.userId);
  const user = await User.findById(req.headers.userId);
  if (!user) return res.status(400).send("Ivalid user");

  let task = new Task({
    content: req.body.content,
    state: req.body.state,
    user: user._id
  });
  task = await task.save();

  res.send(task);
});

router.put("/:id", tokenAuth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = await Task.findById(req.params.id);

  if (!task) return res.status(404).send("Nie znaleziono taska");

  if (task.user != req.headers.userId)
    return res.status(403).send("Brak dostępu do taska");

  task.content = req.body.content;
  task.state = req.body.state;

  task = await task.save();

  res.send(task);
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);
    res.send(task);
  } catch (e) {
    if (!task)
      return res.status(404).send("The TASK with the given ID was not found.");
  }
});

module.exports = router;
