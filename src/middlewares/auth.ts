import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../helpers/api-errors.js";
import { User } from "../../generated/prisma/client.js";

export default function auth() {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: unknown, user: User | false) => {
        if (err) return next(err);

        if (!user) {
          return next(new UnauthorizedError("Unauthorized"));
        }

        req.user = user;
        return next();
      },
    )(req, res, next);
  };
}
