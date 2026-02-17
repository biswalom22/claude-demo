import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
