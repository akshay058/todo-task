// Todo.js
import React from "react";

const Todo = ({ todo, toggleComplete }) => {
  return (
    <div
      className={`todo ${todo.completed ? "completed" : ""}`}
      onClick={() => toggleComplete(todo.id)}
    >
      {todo.text}
    </div>
  );
};

export default Todo;
