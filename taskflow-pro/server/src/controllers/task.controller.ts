import {
  createTask,
  deleteTask,
  getTaskUser,
  updateTask,
} from "../services/task.service";
import { Request, Response } from "express";

export const getTaskByUSer = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { tasks } = await getTaskUser(userId);
    res.status(200).json({ tasks });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleCreateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { name, assignedToId, description,dueDate,projectId,status } = req.body;

    console.log("create task", userId);
    
    const task = await createTask(
      userId,
      assignedToId,
      name,
      description,
      dueDate,
      projectId,
      status
    );

    res.status(200).json({
      message: "Task created successfully",
      task: task,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleUpdateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const {
      taskId,
      assignedToId,
      name,
      description,
      dueDate,
      projectId,
      status,
    } = req.body;
    
    console.log(" task ID", taskId);

    const updated = await updateTask(
      userId,
      assignedToId,
      taskId,
      name,
      description,
      dueDate,
      projectId,
      status
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: updated,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleDeleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const { taskId } = req.body;

    const updated = await deleteTask(taskId, userId);
    if (!updated) throw new Error("Task not found");
    if (updated === null) throw new Error("Task not found");
    if (updated === undefined) throw new Error("Task not found");

    res.status(200).json({
      message: "Task deleted successfully",
      task: updated,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
