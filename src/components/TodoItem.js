import React from "react";

export default function TodoItem({
  todo,
  onDeleteHandler,
  onEditHandler,
  handleCompleted,
}) {
  return (
    <div className="row mt-2 w-75">
      <div
        className="col-sm-4   col-lg-5 col-xl-4 fs-4 text-start ms-5 border border-secondary rounded cursor overflow-auto text-break"
        onClick={() => handleCompleted(todo)}
      >
        <span className="me-2">
          {todo.completed ? (
            <i className="fa-regular fa-square-check"></i>
          ) : (
            <i className="fa-regular fa-hourglass-half fa-sm pe-1"></i>
          )}
        </span>
        <span className={todo.completed ? "text-decoration-line-through" : ""}>
          {" "}
          {todo.text}{" "}
        </span>
      </div>
      <div className="col-sm-4  col-lg-4 col-xl-6 fs-4 w-45 text-start ms-5 ">
        <button
          className="offset-lg-1 offset-xl-2 btn btn-info me-3"
          onClick={() => {
            onEditHandler(todo.id, todo.text);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteHandler(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
