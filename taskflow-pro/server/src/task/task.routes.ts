import {
  getTaskByUSer,
  getTaskList,
  handleCreateTask,
  handleDeleteTask,
  handleGetTaskDetail,
  handleUpdateTask,
} from "./task.controller";
import express, { Request, Response } from "express";

import { verifyToken } from "../middlewares/auth";
import { checkDivisionAdmin } from "../middlewares/isDivisionAdmin";

const router = express.Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
  void getTaskList(req, res);
});

router.get("/user/:id", verifyToken, getTaskByUSer);

router.get("/:id", verifyToken, handleGetTaskDetail);

router.post("/create", checkDivisionAdmin, verifyToken, handleCreateTask);

router.put("/update", checkDivisionAdmin, verifyToken, handleUpdateTask);

router.delete("/delete/:id", checkDivisionAdmin, verifyToken, handleDeleteTask);

export default router;
