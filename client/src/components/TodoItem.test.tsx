import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

const mockTodo: Todo = {
  id: 1,
  title: "Test Todo",
  completed: false,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

describe("TodoItem", () => {
  it("renders the todo title", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
  });

  it("renders unchecked checkbox for incomplete todo", () => {
    render(
      <TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders checked checkbox for completed todo", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem todo={completedTodo} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("calls onToggle when checkbox is clicked", () => {
    const onToggle = jest.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={jest.fn()} />
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(1, true);
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = jest.fn();
    render(
      <TodoItem todo={mockTodo} onToggle={jest.fn()} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("applies completed class for completed todo", () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { container } = render(
      <TodoItem todo={completedTodo} onToggle={jest.fn()} onDelete={jest.fn()} />
    );
    expect(container.querySelector(".todo-item")).toHaveClass("completed");
  });
});
