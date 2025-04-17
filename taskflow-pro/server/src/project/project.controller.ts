import {
  createProject,
  deleteProject,
  getListProjects,
  getProjectDetail,
  getProjectUser,
  updateProject,
} from "./project.service";
import { Request, Response } from "express";

export const getProjectByUSer = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { projects } = await getProjectUser(userId);
    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// controllers/user.controller.ts
export const getProjectList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const { projects, total } = await getListProjects(page, limit);

    return res.status(200).json({
      data: projects,
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

export const getProjectByUSerLogin = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { projects } = await getProjectUser(userId);
    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleGetProjectDetail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    if (!userId) throw new Error("not Authorized");
    const projectId = req.params.id;
    const project = await getProjectDetail(projectId);
    if (!project) throw new Error("Project not found");
    res.status(200).json({ project });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
export const handleCreateProject = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { name, division_id } = req.body;

    console.log("create project", userId);

    const updated = await createProject(userId, name, division_id);

    res.status(200).json({
      message: "Project created successfully",
      project: updated,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleUpdateProject = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { projectId, name, division_id } = req.body;

    console.log(" project ID", projectId);

    const updated = await updateProject(projectId, userId, name, division_id);

    res.status(200).json({
      message: "Project updated successfully",
      project: updated,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleDeleteProject = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { projectId } = req.body;

    const updated = await deleteProject(projectId, userId);

    res.status(200).json({
      message: "Project deleted successfully",
      project: updated,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
