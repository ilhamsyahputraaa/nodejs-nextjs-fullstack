import { Request, Response } from "express";
import {
  getProfileUser,
  updatePasswordUser,
  updateProfileUser,
} from "../services/user.service";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { user } = await getProfileUser(id);
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const handleUpdateProfile = async (req: Request, res: Response) => {
  try {
    
    const userId = (req as any).user.id; // dari verifyToken middleware
    console.log(userId);
    const { name, image } = req.body;

    const updated = await updateProfileUser(userId, { name, image });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updated.user,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const handleUpdatePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // dari verifyToken middleware
    const { oldPassword, newPassword } = req.body;

    console.log(userId, "update pw");
    

    const updated = await updatePasswordUser(userId, oldPassword, newPassword);

    res.status(200).json({
      message: "Password updated successfully",
      user: updated.user,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
