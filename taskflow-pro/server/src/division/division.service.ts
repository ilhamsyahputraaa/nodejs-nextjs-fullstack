import { PrismaClient, User, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDivisions = async (page = 1, limit = 10) => {
  
   const skip = (page - 1) * limit;

   const [divisions, total] = await Promise.all([
    prisma.division.findMany({
      skip,
      take:limit,
    include: {
      members: {
        include: {
          user: true,
        },
      },
      projects: true,
    },
  }), prisma.division.count()
   ])
  return {divisions, total}
};

export const getDivisionById = async (id: string) => {
  const division = await prisma.division.findUnique({
    where: { id },
    include: {
      members: {
        include: { user: true },
      },
      projects: true,
    },
  });

  if (!division) throw new Error("Division not found");
  return division;
};

export const createDivision = async (name: string) => {
  return prisma.division.create({
    data: { name },
  });
};

export const addMemberToDivision = async (
  divisionId: string,
  userId: string,
  role: UserRole = "MEMBER"
) => {
  return prisma.divisionMember.create({
    data: {
      divisionId,
      userId,
      role,
    },
  });
};

export const updateMemberRole = async (memberId: string, newRole: UserRole) => {
  return prisma.divisionMember.update({
    where: { id: memberId },
    data: { role: newRole },
  });
};

export const removeMemberFromDivision = async (memberId: string) => {
  return prisma.divisionMember.delete({
    where: { id: memberId },
  });
};

export const isDivisionAdmin = async (userId: string, divisionId: string) => {
  const member = await prisma.divisionMember.findFirst({
    where: {
      userId,
      divisionId,
      role: "ADMIN", // atau UserRole.ADMIN kalau enum import
    },
  });
  return !!member;
};
