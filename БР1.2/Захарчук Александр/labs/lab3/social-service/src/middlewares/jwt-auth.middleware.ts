import { Request, Response, NextFunction } from "express";
import axios from "axios";

export async function JwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/validate`, { token });

    const { user_id } = response.data;
    if (typeof user_id !== "number") {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    res.user = { id: user_id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
