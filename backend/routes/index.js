const express = require("express");
const router = express.Router();
const todoController = require("../controllers/TodoController");

router.get("/todo", todoController.getAllTodo);
router.put("/todo/:id", todoController.updateTodo);
router.get("/todo/:id", todoController.getTodo);
router.post("/todo", todoController.addTodo);
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
