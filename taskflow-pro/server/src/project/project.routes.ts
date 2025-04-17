import {
  getProjectByUSer,
  getProjectByUSerLogin,
  handleCreateProject,
  handleDeleteProject,
  handleGetProjectDetail,
  handleUpdateProject,
} from "./project.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyToken, getProjectByUSerLogin);

router.get("/user", verifyToken, getProjectByUSer);

router.post("/create", verifyToken, handleCreateProject);

router.get("/:id", verifyToken, handleGetProjectDetail);

router.put("/update", verifyToken, handleUpdateProject);

router.delete("/delete", verifyToken, handleDeleteProject);

export default router;
