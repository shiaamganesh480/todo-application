import { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd({
      title,
      completed: false,
    });

    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        marginBottom: "30px",
      }}
    >
      <input
        type="text"
        placeholder="Enter Todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          flex: 1,
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "16px",
        }}
      />

      <button
        type="submit"
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;