const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const tasks = require("./routes/tasks");
const express = require('express');
var cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost/todoapp')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(cors());
app.use(express.json());
app.use('/api/users', users);
app.use("/api/tasks", tasks);
app.use('/', users);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));