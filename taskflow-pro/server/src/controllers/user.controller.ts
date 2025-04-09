import { Request, Response } from "express";
import { getProfileUser } from "@services/user.service";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { user } = await getProfileUser(id);
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
