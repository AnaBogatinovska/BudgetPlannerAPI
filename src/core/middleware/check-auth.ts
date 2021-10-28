import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "mZlXfDsOqi3");
    req.userData = decoded;
    return next();
  } catch (error) {
    res.status(401).json({
      message: "Authorization failed !",
    });
  }
};
