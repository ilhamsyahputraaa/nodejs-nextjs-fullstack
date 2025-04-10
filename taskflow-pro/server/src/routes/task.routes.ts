import {
  handleCreateTask,
  handleDeleteTask,
  handleUpdateTask,
} from "../controllers/task.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth";
import { checkDivisionAdmin } from "../middlewares/isDivisionAdmin";

const router = express.Router();

router.post("/create", checkDivisionAdmin, verifyToken, handleCreateTask);


router.put("/update", checkDivisionAdmin, verifyToken, handleUpdateTask
);

router.delete("/delete", checkDivisionAdmin, verifyToken, handleDeleteTask);

export default router;
