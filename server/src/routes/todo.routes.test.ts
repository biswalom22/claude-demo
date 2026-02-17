import express from "express";
import request from "supertest";
import app from "../app";

// Mock the prisma client
jest.mock("../lib/prisma", () => {
  return {
    __esModule: true,
    default: {
      todo: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    },
  };
});

import prisma from "../lib/prisma";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const mockTodo = {
  id: 1,
  title: "Test Todo",
  completed: false,
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

describe("Todo Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/todos", () => {
    it("should return all todos", async () => {
      (mockPrisma.todo.findMany as jest.Mock).mockResolvedValue([mockTodo]);

      const res = await request(app).get("/api/todos");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].title).toBe("Test Todo");
    });

    it("should return 500 on database error", async () => {
      (mockPrisma.todo.findMany as jest.Mock).mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/api/todos");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to fetch todos");
    });
  });

  describe("GET /api/todos/:id", () => {
    it("should return a single todo", async () => {
      (mockPrisma.todo.findUnique as jest.Mock).mockResolvedValue(mockTodo);

      const res = await request(app).get("/api/todos/1");

      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Test Todo");
    });

    it("should return 404 for non-existent todo", async () => {
      (mockPrisma.todo.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get("/api/todos/999");

      expect(res.status).toBe(404);
      expect(res.body.error).toBe("Todo not found");
    });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = { ...mockTodo, title: "New Todo" };
      (mockPrisma.todo.create as jest.Mock).mockResolvedValue(newTodo);

      const res = await request(app)
        .post("/api/todos")
        .send({ title: "New Todo" });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe("New Todo");
    });

    it("should return 400 for empty title", async () => {
      const res = await request(app)
        .post("/api/todos")
        .send({ title: "" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Title is required");
    });

    it("should return 400 for missing title", async () => {
      const res = await request(app)
        .post("/api/todos")
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Title is required");
    });
  });

  describe("PATCH /api/todos/:id", () => {
    it("should update a todo title", async () => {
      const updated = { ...mockTodo, title: "Updated" };
      (mockPrisma.todo.update as jest.Mock).mockResolvedValue(updated);

      const res = await request(app)
        .patch("/api/todos/1")
        .send({ title: "Updated" });

      expect(res.status).toBe(200);
      expect(res.body.title).toBe("Updated");
    });

    it("should toggle todo completion", async () => {
      const updated = { ...mockTodo, completed: true };
      (mockPrisma.todo.update as jest.Mock).mockResolvedValue(updated);

      const res = await request(app)
        .patch("/api/todos/1")
        .send({ completed: true });

      expect(res.status).toBe(200);
      expect(res.body.completed).toBe(true);
    });

    it("should return 404 for non-existent todo", async () => {
      const prismaError = new Error("Not found") as any;
      prismaError.code = "P2025";
      (mockPrisma.todo.update as jest.Mock).mockRejectedValue(prismaError);

      const res = await request(app)
        .patch("/api/todos/999")
        .send({ title: "Updated" });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete a todo", async () => {
      (mockPrisma.todo.delete as jest.Mock).mockResolvedValue(mockTodo);

      const res = await request(app).delete("/api/todos/1");

      expect(res.status).toBe(204);
    });

    it("should return 404 for non-existent todo", async () => {
      const prismaError = new Error("Not found") as any;
      prismaError.code = "P2025";
      (mockPrisma.todo.delete as jest.Mock).mockRejectedValue(prismaError);

      const res = await request(app).delete("/api/todos/999");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /api/health", () => {
    it("should return health status", async () => {
      const res = await request(app).get("/api/health");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });
  });
});
