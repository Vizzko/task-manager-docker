// File: server.js (Task Manager Backend with MongoDB)
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://mongo:27017/taskify", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  status: String,
  section: String,
  due: String,
  priority: String
});

const Task = mongoose.model("Task", taskSchema);

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a new task
app.post("/tasks", async (req, res) => {
  const { title, status, section, due, priority } = req.body;
  const newTask = new Task({
    id: uuidv4(),
    title,
    status: status || "pending",
    section: section || "Inbox",
    due: due || new Date().toISOString().slice(0, 10),
    priority: priority || "medium"
  });
  await newTask.save();
  res.status(201).json(newTask);
});

// Update a task title or status
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;
  await Task.findOneAndUpdate({ id }, { $set: { title, status } });
  res.sendStatus(200);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findOneAndDelete({ id });
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`🌿 Server with MongoDB running at http://localhost:${port}`);
});
