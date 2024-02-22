import { errorHandler } from "@/middlewares/globalErrorHandler";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export function joiValidation(schema: ObjectSchema): MethodDecorator {
  return function (
    _target: any,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req: Request = args[0];
      // const res: Response = args[1];
      const next: NextFunction = args[2];
      const { error } = schema.validate(req.body);
      if (error?.details) {
        return next(errorHandler.createError(400, error.details[0].message));
      }
      return originalMethod.apply(this, args);
    };
  };
}
