// middlewares/isDivisionAdmin.ts
import { Request, Response, NextFunction } from "express";
import { isDivisionAdmin } from "../services/division.service";
import { ApiError } from "../utils/apiError";

export const checkDivisionAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as any).user?.id;
  const divisionId = req.params.divisionId || req.body.division_id;

  if (!userId || !divisionId) {
    return next(new ApiError(400, "User or Division ID missing"));
  }

  const isAdmin = await isDivisionAdmin(userId, divisionId);

  if (!isAdmin) {
    return next(new ApiError(403, "Forbidden - Not a division admin"));
  }

  next();
};
