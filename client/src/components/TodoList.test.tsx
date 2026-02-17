import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "./TodoList";
import { Todo } from "../types/todo";

const mockTodos: Todo[] = [
  {
    id: 1,
    title: "First Todo",
    completed: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "Second Todo",
    completed: true,
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

describe("TodoList", () => {
  it("renders all todos", () => {
    render(
      <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });

  it("shows empty message when no todos", () => {
    render(
      <TodoList todos={[]} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText("No todos yet. Add one above!")).toBeInTheDocument();
  });

  it("renders correct number of todo items", () => {
    render(
      <TodoList todos={mockTodos} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    const items = screen.getAllByRole("checkbox");
    expect(items).toHaveLength(2);
  });
});
