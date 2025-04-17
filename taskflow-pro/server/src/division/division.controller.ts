import { Request, Response } from "express";
import * as divisionService from "./division.service";

export const handleGetAllDivisions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { divisions, total } = await divisionService.getAllDivisions(
      page,
      limit
    );

    const userId = (req as any).user?.id;
    if (!userId) throw new Error("Not authorized");

    return res.status(200).json({
      data: divisions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
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
