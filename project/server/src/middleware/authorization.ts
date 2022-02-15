import { Request, Response, NextFunction } from "express";
import { checkJwt } from "../utils/jwt";

export const authorizationCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (accessToken) {
    const decoded = await checkJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
      return next();
    } else {
      res.status(404).json({
        message: "Token not valid",
      });
    }
  } else {
    res.status(401).json({
      message: "not Authorized",
    });
  }
};
