import React from "react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
        <span className="todo-title">{todo.title}</span>
      </label>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
