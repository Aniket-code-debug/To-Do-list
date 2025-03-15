const express = require("express");
const Todo = require("../models/ToDo");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task, userId: req.user.id }); 
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error fetching todos" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, 
      req.body,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); 
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

module.exports = router;
