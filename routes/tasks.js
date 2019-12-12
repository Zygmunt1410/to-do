const { Task, validate } = require("../models/task");
const express = require("express");
const router = express.Router();
const tokenAuth = require("../middleware/token-auth.js");
router.get("/", tokenAuth, async (req, res) => {
  console.log(req.body.userId);
  try {
    const tasks = await Task.find().sort("content");
    res.send(tasks);
  } catch (e) {
    res.status(500).send("Something failed");
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let task = new Task({
    content: req.body.content,
    state: req.body.state //,
    //    user: req.body.user,
  });
  task = await task.save();

  res.send(task);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { content: req.body.content, state: req.body.state },
    { new: true }
  );

  if (!task)
    return res.status(404).send("The TASK with the given ID was not found.");

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
