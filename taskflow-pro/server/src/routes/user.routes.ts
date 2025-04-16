import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  getUserById,
  handleGetListUser,
  handleGetSummaryData,
  handleUpdatePassword,
  handleUpdateProfile,
} from "../controllers/user.controller";

const router = express.Router();


router.get("/summary", verifyToken, handleGetSummaryData);


router.get("/list",verifyToken,handleGetListUser)
router.get("/:id", verifyToken, getUserById);

router.put("/update", verifyToken, handleUpdateProfile);

router.put("/update-password", verifyToken, handleUpdatePassword);

export default router;
