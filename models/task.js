const Joi = require("joi");
const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    content: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200
    },
    date: {type: Date, default: Date.now },
    state: String
  })
);
function validateTask(task) {
  const schema = {
    content: Joi.string()
      .min(3)
      .required(),
    state: Joi.string().regex(/^new$|^in-progress$|^done$/)
  };

  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
