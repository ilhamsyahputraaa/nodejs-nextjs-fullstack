import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// services/user.service.ts
export const getListUsers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      include: {
        Project: true,
        tasks: true,
        divisions: true,
      },
    }),
    prisma.user.count(),
  ]);

  return { users, total };
};

export const getProfileUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("Invalid credentials");
  return { user };
};


export const updateProfileUser = async (
  id: string,
  payload: Partial<{
    name: string;
    image: string;
  }>
) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) throw new Error("Invalid credentials");

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: payload.name,
      image: payload.image,
    },
    include:{
      Project:{include:{tasks:true}}
    }
  });

  return { user: updatedUser };
};


export const updatePasswordUser = async (
  id: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || !user.password)
    throw new Error("User not found or password not set");

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return { user: updatedUser };
};
