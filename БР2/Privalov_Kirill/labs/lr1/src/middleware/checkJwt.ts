import { Request, Response, NextFunction } from 'express';
import { verifyJwt, JwtPayload } from '../utils/jwt';
import { Role } from '../entities/Role';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'No Authorization header' });
    return;
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Malformed Authorization header' });
    return;
  }

  try {
    const payload = verifyJwt(token) as JwtPayload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};

export function checkRole(requiredRole: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      res.status(401).json({ message: 'No Authorization header' });
      return;
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      res.status(401).json({ message: 'Malformed Authorization header' });
      return;
    }

    try {
      const payload = verifyJwt(token) as JwtPayload;
      if (payload.role !== requiredRole) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }
  };
}
