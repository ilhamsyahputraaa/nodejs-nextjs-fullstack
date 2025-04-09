import {
  handleCreateProject,
  handleDeleteProject,
  handleUpdateProject,
} from "../controllers/project.controller";
import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
  verifyToken;
  void handleCreateProject(req, res);
});

router.post("/update", (req: Request, res: Response) => {
  verifyToken;
  void handleUpdateProject(req, res);
});

router.post("/delete", (req: Request, res: Response) => {
  verifyToken;
  void handleDeleteProject(req, res);
});

export default router;
