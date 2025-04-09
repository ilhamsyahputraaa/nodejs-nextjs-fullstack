import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getProjectUser = async (userId: string) => {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
  });
  if (!projects) throw new Error("Invalid credentials");
  return { projects };
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
