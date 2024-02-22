import { config } from "@/config";
import { NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  status?: number;
  message: string;
}

class ErrorHandler {
  public createError(status: number, message: string): Error {
    const error = new Error(message);
    (error as any).status = status;
    return error;
  }

  public handleGlobalError(
    error: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "This is a server error";

    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      ...(process.env.DEBUG_MODE === "true" && { stack: error.stack }),
    });

  }
}

export const errorHandler: ErrorHandler = new ErrorHandler();
