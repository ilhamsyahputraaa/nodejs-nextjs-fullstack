import express, { Request, Response } from "express";
import {
  handleGetAllDivisions,
  handleGetDivisionById,
  handleCreateDivision,
  handleAddMember,
  handleUpdateMemberRole,
  handleRemoveMember,
} from "./division.controller";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

router.get("/", verifyToken, (req: Request, res: Response) => {
  void handleGetAllDivisions(req, res);
});
router.get("/:id", verifyToken, handleGetDivisionById);
router.post("/create", verifyToken, handleCreateDivision);
router.post("/add-member", verifyToken, handleAddMember);
router.put("/update-role", verifyToken, handleUpdateMemberRole);
router.delete("/remove-member/:memberId", verifyToken, handleRemoveMember);

export default router;
