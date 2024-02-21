import express from "express";
const router = express.Router();
import {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.js";

router.post("/add-task", addTask);

router.get("/", getAllTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
