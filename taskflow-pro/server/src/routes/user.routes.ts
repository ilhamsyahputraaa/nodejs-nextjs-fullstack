import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  getUserById,
  handleUpdateProfile,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/:id", verifyToken, getUserById);

router.put("/update/:id", verifyToken, handleUpdateProfile);

router.put("/update-password/:id", verifyToken, handleUpdateProfile);

export default router;
