import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputText("");
      //save data in local storage
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    }
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      // Separate completed and active TODOs
      const completedTodos = updatedTodos.filter((todo) => todo.completed);
      const activeTodos = updatedTodos.filter((todo) => !todo.completed);
      const sortedActiveTodos = activeTodos.sort((a, b) => a.id - b.id);

      // Save updated todos to localStorage
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      // Combine active and completed TODOs
      return [...completedTodos, ...sortedActiveTodos];
    });
  };

  const resetTodos = () => {
    setTodos([]);
    // Clear localStorage
    localStorage.removeItem("todos");
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Add a new todo..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={resetTodos}>Reset</button>
      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
