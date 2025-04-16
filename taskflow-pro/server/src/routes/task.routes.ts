import {
  getTaskByUSer,
  handleCreateTask,
  handleDeleteTask,
  handleGetTaskDetail,
  handleUpdateTask,
} from "../controllers/task.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth";
import { checkDivisionAdmin } from "../middlewares/isDivisionAdmin";
import { handleGetListUser } from "../controllers/user.controller";

const router = express.Router();

router.get('/users', verifyToken, handleGetListUser)

router.get("/user/:id", verifyToken, getTaskByUSer);


router.get("/:id", verifyToken, handleGetTaskDetail);


router.post("/create", checkDivisionAdmin, verifyToken, handleCreateTask);


router.put("/update", checkDivisionAdmin, verifyToken, handleUpdateTask
);

router.delete("/delete/:id", checkDivisionAdmin, verifyToken, handleDeleteTask);

export default router;
