import express, { Request, Response } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import { verifyToken } from "middlewares/auth";
import { getUserById } from "@controllers/user.controller";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  void register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  void login(req, res);
});

router.get("/profile", verifyToken, getProfile);


router.get("/profile/:id", verifyToken, getUserById);



export default router;
