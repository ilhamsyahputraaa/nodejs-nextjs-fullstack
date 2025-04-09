import { Request, Response } from "express";
import * as divisionService from "../services/division.service";

export const handleGetAllDivisions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const divisions = await divisionService.getAllDivisions();
    res.status(200).json({ divisions });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};


export const handleGetDivisionById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const id = req.params.id;
    const division = await divisionService.getDivisionById(id);
    if (!division) throw new Error("Division not found");

    res.status(200).json({ division });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};


export const handleCreateDivision = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const { name } = req.body;
    const division = await divisionService.createDivision(name);
    res.status(201).json({ division });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const handleAddMember = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const { divisionId, userId: memberUserId, role } = req.body;
    const member = await divisionService.addMemberToDivision(
      divisionId,
      memberUserId,
      role
    );

    res.status(201).json({ member });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const handleUpdateMemberRole = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const { memberId, newRole } = req.body;
    const member = await divisionService.updateMemberRole(memberId, newRole);

    res.status(200).json({ member });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const handleRemoveMember = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    const { memberId } = req.params;
    await divisionService.removeMemberFromDivision(memberId);

    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

