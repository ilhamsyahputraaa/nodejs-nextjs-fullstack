import { Request, Response } from "express";
import { registerUser, loginUser, getProfileUser } from "./auth.service";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const user = await registerUser(email, password, name);
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true kalau HTTPS (PROD)
      sameSite: "lax", // bisa juga "strict"
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({ user, token });
    console.log(user, token);
    console.log("anda sudah login");
  } catch (err: any) {
    res.status(401).json({ error: err.message });
    console.log("someone error logged in");
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id; // Ambil ID dari JWT (middleware)
    if (!id) throw new Error("Unauthorized");

    const { user } = await getProfileUser(id);

    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
