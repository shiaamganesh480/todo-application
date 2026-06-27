import { useState } from "react";

function TodoCard({ todo, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const saveTodo = () => {
    // Temporary local update
    todo.title = title;
    setIsEditing(false);
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "25px",
        marginBottom: "20px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "20px",
            color: "#000",
          }}
        />
      ) : (
        <h2
          style={{
            color: "#000",
            textAlign: "center",
            fontSize: "28px",
            marginBottom: "12px",
          }}
        >
          {todo.title}
        </h2>
      )}

      <p
        style={{
          textAlign: "center",
          color: "#555",
          fontSize: "17px",
          marginBottom: "25px",
        }}
      >
        Status :
        <strong style={{ color: "#000" }}>
          {" "}
          {todo.completed ? "Completed ✅" : "Pending ⏳"}
        </strong>
      </p>

      {/* Center Buttons */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => onToggle(todo)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            minWidth: "140px",
            fontWeight: "600",
          }}
        >
          {todo.completed ? "Mark Pending" : "Mark Complete"}
        </button>

        {isEditing ? (
          <button
            onClick={saveTodo}
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              minWidth: "100px",
              fontWeight: "600",
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "#16a34a",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              minWidth: "100px",
              fontWeight: "600",
            }}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            minWidth: "100px",
            fontWeight: "600",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoCard;