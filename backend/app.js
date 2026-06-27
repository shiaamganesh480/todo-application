const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.post("/test", (req, res) => {
    res.json({
        message: "POST works",
        body: req.body
    });
});

// Todo routes
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
    res.send("Todo API is Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});