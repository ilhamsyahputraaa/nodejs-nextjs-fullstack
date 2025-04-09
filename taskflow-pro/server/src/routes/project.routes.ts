import {
  handleCreateProject,
  handleDeleteProject,
  handleUpdateProject,
} from "../controllers/project.controller";
import express from "express";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/create", verifyToken, handleCreateProject);


router.put("/update", verifyToken, handleUpdateProject
);

router.delete("/delete", verifyToken, handleDeleteProject);

export default router;
