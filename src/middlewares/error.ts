import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors.js";

export default function errorMiddleware(
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.code || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).json({ message, details: error.details });
}
