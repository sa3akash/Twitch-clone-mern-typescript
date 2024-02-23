import { NextFunction, Request, Response } from "express";
import { errorHandler } from "./globalErrorHandler";
import { jwtUtils, IPaylowd } from "@/utils/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: IPaylowd;
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) return next(errorHandler.createError(401, "Token not provide."));

  jwtUtils.verifyJwt(token, (err, user) => {
    if (err) return next(errorHandler.createError(401, err.message));
    req.user = user as IPaylowd;
    next();
  });
};
