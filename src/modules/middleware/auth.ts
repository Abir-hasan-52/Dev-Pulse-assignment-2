import type {
  NextFunction,
  Request,
  Response,
} from "express";

import jwt from "jsonwebtoken";

import config from "../../config";
import type { TRole } from "../types";

const auth = (...roles: TRole[]) => {

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      // 1. get token
      const token =
        req.headers.authorization;

      // 2. check token
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      // 3. verify token
      const decoded = jwt.verify(
        token,
        config.secret as string
      ) as {
        id: number;
        name: string;
        role: TRole;
      };

      // 4. role checking
      if (
        roles.length &&
        !roles.includes(decoded.role)
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You have no access",
        });
      }

      // 5. attach user
      req.user  = decoded;

      next();

    } catch (error) {

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });

    }
  };
};

export default auth;