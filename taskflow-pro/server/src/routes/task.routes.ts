import {
  handleCreateTask,
  handleDeleteTask,
  handleUpdateTask,
} from "../controllers/task.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/create", verifyToken, handleCreateTask);


router.put("/update", verifyToken, handleUpdateTask
);

router.delete("/delete", verifyToken, handleDeleteTask);

export default router;
