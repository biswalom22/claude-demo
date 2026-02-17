import React, { useEffect, useState } from "react";
import { Todo } from "./types/todo";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api/todos";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async () => {
    try {
      setError(null);
      const data = await fetchTodos();
      setTodos(data);
    } catch {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAdd = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      setError("Failed to add todo");
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const updated = await updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="app">
      <h1>TODO App</h1>
      <AddTodo onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
