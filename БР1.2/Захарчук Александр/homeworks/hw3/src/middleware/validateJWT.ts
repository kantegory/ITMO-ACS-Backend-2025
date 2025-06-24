import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = <string>req.headers["authorization"];
  if (!authHeader) {
    res.status(401).send({detail: "Unathorized"});
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send({detail: "Unathorized"});
    return;
  }

  try {
    const jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({detail: "Unathorized"});
    return;
  }
  next();
};
