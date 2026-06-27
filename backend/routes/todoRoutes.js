const express = require("express");

const router = express.Router();

const {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
} = require("../controllers/todoController");
// GET all todos
router.get("/", getTodos);

router.post("/", createTodo);

router.get("/:id", getTodoById);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;