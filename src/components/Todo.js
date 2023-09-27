import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

export default function Todo() {
  const [inputVal, setInputVal] = useState(""); // to handle input
  const [todoArr, setTodoArr] = useState([]); // to store array of todo list data
  const [isEditing, setIsEditing] = useState({
    editing: false,
    editId: "",
  });

  // Filter of data
  const ALL = "ALL";
  const COMPLETED = "COMPLETED";
  const PENDING = "PENDING";
  const [filter, setFilter] = useState(ALL);

  // on click return key or Enter app should add task
  const onAddTodoHandler = () => {
    if (inputVal.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputVal,
        completed: false,
      };
      setTodoArr([newTodo, ...todoArr]);
      // console.log(todoArr);
      setInputVal("");
      //save data in local storage
      localStorage.setItem("todoArr", JSON.stringify([newTodo, ...todoArr]));
    }
  };

  //Delete handler to handle delete
  const onDeleteHandler = (id) => {
    // console.log(id);
    // const filteredArr = todoArr.filter((ele) => ele.id !== id);
    // setTodoArr(filteredArr);
    // by splice method delete........
    const idx = todoArr.findIndex((elem) => elem.id === id);
    const cloneArr = [...todoArr];
    cloneArr.splice(idx, 1);
    setTodoArr(cloneArr);
    // Clear localStorage
    localStorage.setItem("todoArr", JSON.stringify(cloneArr));
  };

  //Update Handler for update the value and save it into LocalStorage
  const onEditHandler = (id, text) => {
    setInputVal(text);
    setIsEditing({ ...isEditing, editing: true, editId: id });
  };

  const updateTodoHandler = () => {
    if (inputVal.trim() !== "") {
      const cloneArr = [...todoArr];
      const elemIdx = cloneArr.findIndex(
        (elem) => elem.id === isEditing.editId
      );
      const newTodoBeAdded = {
        id: isEditing.editId,
        text: inputVal,
      };
      cloneArr[elemIdx] = newTodoBeAdded;
      setTodoArr(cloneArr);
      setInputVal("");
      setIsEditing({ editing: false, editId: "" });
      //save data in local storage
      localStorage.setItem("todoArr", JSON.stringify(cloneArr));
    }
  };

  //  To handle Clicking on a TODO card which mark the TODO as complete and move it to the bottom of the list.
  const handleCompleted = (todo) => {
    // console.log(todo);
    const cloneArr = [...todoArr];
    const elem = cloneArr.findIndex((elem) => elem.id === todo.id);
    const newTodoBeAdded = {
      ...todo,
      completed: !todo.completed,
    };
    cloneArr[elem] = newTodoBeAdded;

    // Separate completed and active TODOs
    const completedTodos = cloneArr.filter((todo) => todo.completed);
    const activeTodos = cloneArr.filter((todo) => !todo.completed);
    const sortedActiveTodos = activeTodos.sort((a, b) => b.id - a.id);
    const data = [...sortedActiveTodos, ...completedTodos];
    // Save updated todos to localStorage
    localStorage.setItem("todoArr", JSON.stringify(data));
    setTodoArr(data);

    // Combine active and completed TODOs
    return data;
  };

  // Bulk marking complete to all
  const onMarkCompleteHandler = () => {
    const clonedArr = [...todoArr];
    const updatedArr = clonedArr.map((elem) => ({ ...elem, completed: true }));
    setTodoArr(updatedArr);
    // Save updated todos to localStorage
    localStorage.setItem("todoArr", JSON.stringify(updatedArr));
  };

  //Reset button at top to delete all data and reset to initial state
  const resetTodos = () => {
    setTodoArr([]);
    // Clear localStorage
    localStorage.removeItem("todoArr");
  };

  //load data again after refresh
  useEffect(() => {
    const savedTodos = localStorage.getItem("todoArr");
    if (savedTodos) {
      setTodoArr(JSON.parse(savedTodos));
    }
  }, []);

  return (
    <div className="container">
      <h1 className="mt-3 mb-5">Todo App</h1>
      <span>
        {" "}
        <button
          onClick={resetTodos}
          className="btn btn-danger position-absolute top-0 end-0 m-3"
        >
          Reset
        </button>
      </span>
      <div className="d-flex align-items-end justify-content-center">
        <input
          className="form-control mt-3 w-50 align-self-center"
          placeholder="Add Todo "
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              isEditing.editing ? updateTodoHandler() : onAddTodoHandler();
            }
          }}
        ></input>
        {!isEditing.editing ? (
          <button
            className="btn btn-primary ms-3"
            onClick={() => onAddTodoHandler()}
          >
            Add Todo
          </button>
        ) : (
          <button
            className="btn btn-warning ms-3"
            onClick={() => updateTodoHandler()}
          >
            Update Todo
          </button>
        )}
        <button
          className="btn btn-dark ms-2"
          onClick={() => onMarkCompleteHandler()}
        >
          Mark All Complete
        </button>
      </div>
      <div className="border border-secondary mt-5">
        <div className="d-flex justify-content-center my-3 mt-3 ">
          <div className="row w-75 justify-content-around ">
            <button
              onClick={() => setFilter(ALL)}
              className={`border border-secondary ${
                filter === ALL ? "btn-success" : "btn-otline-success"
              } col-2 btn`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter(COMPLETED)}
              className={`border border-secondary ${
                filter === COMPLETED ? "btn-success" : "btn-otline-success"
              } col-2 btn`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter(PENDING)}
              className={`border border-secondary ${
                filter === PENDING ? "btn-success" : "btn-otline-success"
              } col-2 btn`}
            >
              Pending
            </button>
          </div>
        </div>
        <hr></hr>
        <div className="d-flex flex-column align-items-center mt-5 mb-4">
          {todoArr.length > 0 &&
            filter === ALL &&
            todoArr.map((todo, index) => {
              return (
                <TodoItem
                  key={index}
                  onDeleteHandler={onDeleteHandler}
                  todo={todo}
                  onEditHandler={onEditHandler}
                  handleCompleted={handleCompleted}
                />
              );
            })}
          {todoArr.length > 0 &&
            filter === COMPLETED &&
            todoArr.map(
              (todo, index) =>
                todo.completed && (
                  <TodoItem
                    key={index}
                    todo={todo}
                    onDeleteHandler={onDeleteHandler}
                    onEditHandler={onEditHandler}
                    handleCompleted={handleCompleted}
                  />
                )
            )}
          {todoArr.length > 0 &&
            filter === PENDING &&
            todoArr.map(
              (todo, index) =>
                !todo.completed && (
                  <TodoItem
                    key={index}
                    todo={todo}
                    onDeleteHandler={onDeleteHandler}
                    onEditHandler={onEditHandler}
                    handleCompleted={handleCompleted}
                  />
                )
            )}
        </div>
      </div>
    </div>
  );
}
