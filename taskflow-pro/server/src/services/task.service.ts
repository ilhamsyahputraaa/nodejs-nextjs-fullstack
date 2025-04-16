import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();



export const getAllTask = async () => {
  const tasks = await prisma.task.findMany();
  if (!tasks) throw new Error("Invalid credentials");
  return tasks ;
};

export const getTaskUser = async (userId: string) => {
  const tasks = await prisma.task.findMany({
    where: { assignedToId: userId },
  });
  if (!tasks) throw new Error("Invalid credentials");
  return { tasks };
};

export const getTaskDetail = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      project: true,
      assignedTo: true,
    },
  });
  if (!task) throw new Error("Task not found");
  return task;
};

export const createTask = async (
  userId: string,
  assignedToId: string,
  name: string,
  description:string,
  dueDate: Date,
  projectId: string,status:TaskStatus="TODO"
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  if (!projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new Error("Please Assign to a project first");
  }

  const task = await prisma.task.create({
    data: {
      title: name,
      description:description,
      dueDate: dueDate,
      projectId: projectId,
      assignedToId: assignedToId,
      status: status||"TODO",
    },
    include: {
      project: true,
      assignedTo: true,
    },
  });

  return task;
};


export const updateTask = async (
  userId: string,
  assignedToId: string,
  taskId: string,
  name?: string,
  description?: string,
  dueDate?: Date,
  projectId?: string,
  status?: TaskStatus
) => {

  if (!userId) throw new Error("You are not login");
  const existingTask = await prisma.task.findUnique({
    where: { id: taskId },
  });
  if (!existingTask) throw new Error("Task not found");
  if (projectId) {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) throw new Error("Project not found");
  }

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: name,
      description: description,
      dueDate: dueDate,
      projectId: projectId,
      assignedToId: assignedToId,
      status: status || "TODO",
    },
    include: {
      project: true,
      assignedTo: true,
    },
  });

  return updated;
};



export const deleteTask = async (
  taskId: string, userId: string
) => {

  if (!userId) throw new Error("You are not login");
  const task = await prisma.task.delete({
    where: { id: taskId },
  });

  return task;
};
