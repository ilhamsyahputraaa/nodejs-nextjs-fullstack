import { Request, Response } from "express";
import {
  getListUsers,
  getProfileUser,
  updatePasswordUser,
  updateProfileUser,
} from "../services/user.service";
import { getAllDivisions } from "../services/division.service";
import { getAllProjects } from "../services/project.service";
import { getAllTask } from "../services/task.service";

export const handleGetSummaryData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }

    const Users = await getListUsers();
    const Divisions = await getAllDivisions();
    const Projects = await getAllProjects();
    const Tasks = await getAllTask();

    res.status(200).json({
      users: Users.length,
      divisions: Divisions.length,
      projects: Projects.length,
      tasks: Tasks.length,
    });
    console.log("Summary has been hit");
    
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const handleGetListUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // ✅ dari token
    if (!userId) throw new Error("not Authorized");
    const users = await getListUsers();
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

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
