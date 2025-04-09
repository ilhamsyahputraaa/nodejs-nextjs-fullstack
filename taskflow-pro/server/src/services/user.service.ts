import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfileUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("Invalid credentials");
  return { user };
};

