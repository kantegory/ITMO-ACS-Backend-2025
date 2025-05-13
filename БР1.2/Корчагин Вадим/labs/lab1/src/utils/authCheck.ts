import { Action } from "routing-controllers";
import * as jwt from "jsonwebtoken";

export const authorizationChecker = async (action: Action, roles: string[]) => {
  const authHeader = action.request.headers["authorization"];

  if (!authHeader) return false;

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    action.request.user = decoded;
    return true; 
  } catch (err) {
    return false; 
  }
};