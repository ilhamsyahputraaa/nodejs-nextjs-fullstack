import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjectUser = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
  });
  if (!projects) throw new Error("Invalid credentials");
  return { projects };
};

export const getProjectDetail = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      division: true,
      owner: true,
      tasks: {
        include: {
          assignedTo: true,
          project: true,
        },
      },
    },
  });
  if (!project) throw new Error("Project not found");
  return project;
};

export const createProject = async (
  userId: string,
  name: string,
  division_id?: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  if (division_id) {
    const division = await prisma.division.findUnique({
      where: { id: division_id },
    });
    if (!division) throw new Error("Division not found");
  }

  const project = await prisma.project.create({
    data: {
      name,
      divisionId: division_id,
      ownerId: userId,
    },
    include: {
      division: true,
      owner: true,
    },
  });

  return project;
};


export const updateProject = async (
  projectId: string,
  userId: string,
  name: string,
  division_id?: string
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
  });
  if (!existingProject) throw new Error("Project not found");
  if (existingProject.ownerId !== userId)
    throw new Error("Unauthorized to update this project");

  if (division_id) {
    const division = await prisma.division.findUnique({
      where: { id: division_id },
    });
    if (!division) throw new Error("Division not found");
  }

  const updated = await prisma.project.update({
    where: { id: projectId },
    data: {
      name,
      divisionId: division_id,
    },
    include: {
      division: true,
      owner: true,
    },
  });

  return updated;
};



export const deleteProject = async (
  projectId: string,
  userId: string,
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");


  const project = await prisma.project.delete({
    where: { id: projectId },
  });

  return project;
};


