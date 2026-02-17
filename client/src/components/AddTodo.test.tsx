import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTodo from "./AddTodo";

describe("AddTodo", () => {
  it("renders input and button", () => {
    render(<AddTodo onAdd={jest.fn()} />);
    expect(screen.getByPlaceholderText("What needs to be done?")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("calls onAdd with trimmed title on form submit", () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "  New Task  " } });
    fireEvent.click(screen.getByText("Add"));

    expect(onAdd).toHaveBeenCalledWith("New Task");
  });

  it("clears input after submit", () => {
    render(<AddTodo onAdd={jest.fn()} />);

    const input = screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(screen.getByText("Add"));

    expect(input.value).toBe("");
  });

  it("does not call onAdd for empty input", () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);

    fireEvent.click(screen.getByText("Add"));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("does not call onAdd for whitespace-only input", () => {
    const onAdd = jest.fn();
    render(<AddTodo onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByText("Add"));

    expect(onAdd).not.toHaveBeenCalled();
  });
});
