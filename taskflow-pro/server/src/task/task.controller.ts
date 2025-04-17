import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskDetail,
  getTaskUser,
  updateTask,
} from "./task.service";
import { Request, Response } from "express";

export const getTaskList = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { tasks, total } = await getAllTask(page, limit);

    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    return res.status(200).json({
      data: tasks,
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

export const getTaskByUSer = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { tasks } = await getTaskUser(userId);
    res.status(200).json({ tasks });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleGetTaskDetail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari toke
    if (!userId) throw new Error("not Authorized");
    const { taskId } = req.body.id;
    const task = await getTaskDetail(taskId);
    if (!task) throw new Error("Task not found");
    res.status(200).json({ task });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const handleCreateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // ✅ dari token
    const {
      name,
      assignedToId,
      description,
      dueDate,
      projectId,
      status,
      credit,
    } = req.body;

    console.log("create task", userId);

    const task = await createTask(
      userId,
      assignedToId,
      name,
      description,
      dueDate,
      projectId,
      status,
      credit
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
    const taskId = req.params.id;

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
