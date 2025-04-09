import {
  createProject,
  deleteProject,
  getProjectDetail,
  getProjectUser,
  updateProject,
} from "../services/project.service";
import { Request, Response } from "express";

export const getProjectByUSer = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
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
    const { projectId } = req.body.id;
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
