import express, { Request, Response } from "express";
import { register, login, getProfile } from "../controllers/auth.controller";
import {  verifyTokenProfile } from "../middlewares/auth";

const router = express.Router();

router.post("/register", (req: Request, res: Response) => {
  void register(req, res);
});

router.post("/login", (req: Request, res: Response) => {
  void login(req, res);
});

router.get("/profile", verifyTokenProfile, getProfile);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out" });
});


export default router;
