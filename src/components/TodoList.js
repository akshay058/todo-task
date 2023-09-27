// TodoList.js
import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, toggleComplete }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default TodoList;
