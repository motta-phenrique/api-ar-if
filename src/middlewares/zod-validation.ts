import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";
import { ApiError, BadRequestError, ValidationError } from "../helpers/api-errors.js";

export function validateData(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body) as any;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {

        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        throw new ValidationError(errorMessages);
      }

      throw new ApiError("Internal Server Error", 500);
    }
  };
}