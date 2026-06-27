const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/todos.json");

// GET All Todos
const getTodos = (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));
    res.json(todos);
};

// CREATE Todo
const createTodo = (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));

    const newTodo = {
        id: uuidv4(),
        title: req.body.title,
        completed: req.body.completed ?? false,
    };

    todos.push(newTodo);

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

    res.status(201).json(newTodo);
};

// GET Todo By ID
const getTodoById = (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));

    const todo = todos.find((t) => t.id === req.params.id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }

    res.json(todo);
};

// UPDATE Todo
const updateTodo = (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));

    const index = todos.findIndex((t) => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }

    todos[index] = {
        ...todos[index],
        title: req.body.title ?? todos[index].title,
        completed: req.body.completed ?? todos[index].completed,
    };

    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

    res.json(todos[index]);
};

/// DELETE Todo
const deleteTodo = (req, res) => {
    const todos = JSON.parse(fs.readFileSync(filePath));

    const filteredTodos = todos.filter(
        (todo) => todo.id !== req.params.id
    );

    if (filteredTodos.length === todos.length) {
        return res.status(404).json({
            message: "Todo not found",
        });
    }

    fs.writeFileSync(
        filePath,
        JSON.stringify(filteredTodos, null, 2)
    );

    res.json({
        message: "Todo deleted successfully",
    });
};

module.exports = {
    getTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
};