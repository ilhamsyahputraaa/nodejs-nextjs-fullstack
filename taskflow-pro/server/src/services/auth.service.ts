import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (
  email: string,
  password: string,
  name?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "MEMBER",
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

const token = jwt.sign(
  { id: user.id, email:user.email, role:user.role }, // ✅ pakai id
  process.env.JWT_SECRET!,
  { expiresIn: "1d" }
);

  return { user, token };
};


export const getProfileUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("Invalid credentials");
  return { user };
};

