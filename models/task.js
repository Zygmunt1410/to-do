const Joi = require("joi");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  date: { type: Date, default: Date.now },
  state: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: false
  }
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = {
    content: Joi.string()
      .min(3)
      .required(),
    state: Joi.string().regex(/^new$|^in-progress$|^done$/)
  };

  return Joi.validate(task, schema);
}
exports.taskSchema = taskSchema;
exports.Task = Task;
exports.validate = validateTask;
