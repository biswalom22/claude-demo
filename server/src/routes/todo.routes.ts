import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/todos - Get all todos
router.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// GET /api/todos/:id - Get a single todo
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
});

// POST /api/todos - Create a new todo
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "Title is required" });
    }
    const todo = await prisma.todo.create({
      data: { title: title.trim() },
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH /api/todos/:id - Update a todo
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;
    const data: { title?: string; completed?: boolean } = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ error: "Title must be a non-empty string" });
      }
      data.title = title.trim();
    }
    if (completed !== undefined) {
      data.completed = Boolean(completed);
    }

    const todo = await prisma.todo.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.json(todo);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE /api/todos/:id - Delete a todo
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await prisma.todo.delete({
      where: { id: Number(req.params.id) },
    });
    res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
