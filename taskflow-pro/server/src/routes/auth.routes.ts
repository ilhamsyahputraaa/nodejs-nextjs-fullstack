import express, { Request, Response } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { verifyToken } from "middlewares/auth";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  void register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  void login(req, res);
});

router.get("/profile", verifyToken, getProfile);





export default router;
