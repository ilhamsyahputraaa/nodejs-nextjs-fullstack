import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  getUserById,
  getUserList,
  handleGetSummaryData,
  handleUpdatePassword,
  handleUpdateProfile,
} from "./user.controller";

const router = express.Router();

router.get("/summary", verifyToken, handleGetSummaryData);

router.get("/list", verifyToken, (req: Request, res: Response) => {
  void getUserList(req, res);
});
router.get("/:id", verifyToken, getUserById);

router.put("/update", verifyToken, handleUpdateProfile);

router.put("/update-password", verifyToken, handleUpdatePassword);

export default router;
