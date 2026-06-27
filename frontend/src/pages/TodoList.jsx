import { useEffect, useState } from "react";
import API from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await API.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (todo) => {
    try {
      await API.post("/todos", todo);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await API.put(`/todos/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });

      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed")
      return matchesSearch && todo.completed;

    if (filter === "pending")
      return matchesSearch && !todo.completed;

    return matchesSearch;
  });

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          Todo Application
        </h1>

        <TodoForm onAdd={addTodo} />

      {/* Search */}

<div
  style={{
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: "340px",
      background: "#f8fafc",
      border: "2px solid #2563eb",
      borderRadius: "30px",
      padding: "10px 16px",
      boxShadow: "0 5px 15px rgba(37,99,235,0.15)",
    }}
  >
    <span
      style={{
        color: "#2563eb",
        fontSize: "18px",
        marginRight: "10px",
      }}
    >
      🔍
    </span>

    <input
      type="text"
      placeholder="Search Todo..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        flex: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "15px",
      }}
    />
  </div>
</div>

        {/* Filter Buttons */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={buttonStyle(filter === "all")}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            style={buttonStyle(filter === "pending")}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("completed")}
            style={buttonStyle(filter === "completed")}
          >
            Completed
          </button>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "25px",
            fontWeight: "bold",
          }}
        >
          <span>Total : {total}</span>
          <span>Completed : {completed}</span>
          <span>Pending : {pending}</span>
        </div>

        {/* Todo List */}

        {filteredTodos.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              color: "#666",
            }}
          >
            No Todos Found
          </h2>
        ) : (
          filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
            />
          ))
        )}
      </div>
    </div>
  );
}

const buttonStyle = (active) => ({
  background: active ? "#2563eb" : "#e5e7eb",
  color: active ? "#fff" : "#000",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
});

export default TodoList;