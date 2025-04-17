import { Request, Response } from "express";
import {
  getListUsers,
  getProfileUser,
  updatePasswordUser,
  updateProfileUser,
} from "./user.service";
import { getAllDivisions } from "../division/division.service";
import { getAllTask } from "../task/task.service";
import { getListProjects } from "../project/project.service";

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
    const Projects = await getListProjects();
    const Tasks = await getAllTask();

    res.status(200).json({
      users: Users.total,
      divisions: Divisions.total,
      projects: Projects.total,
      tasks: Tasks.total,
    });
    console.log("Summary has been hit");
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const getUserList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { users, total } = await getListUsers(page, limit);

    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    return res.status(200).json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    console.error("❌ Failed to get user list:", err.message);
    return res.status(500).json({ error: "Internal server error" });
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
