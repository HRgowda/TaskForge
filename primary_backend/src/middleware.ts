import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

interface AuthenticatedRequest extends Request {
  user?: { id: number }
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return
  }

  try {
    const payload = jwt.verify(token, JWT_PASSWORD) as { id: number };

    req.user = { id: payload.id }; 

    next(); // Always call next() if successful
    
  } catch (e) {

    res.status(403).json({ message: "Invalid or expired token" });
    
    return;
  }
}
