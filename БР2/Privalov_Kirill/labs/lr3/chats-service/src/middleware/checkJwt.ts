import { Request, Response, NextFunction } from 'express';
import { verifyJwt, JwtPayload } from '../utils/jwt';
import { AppDataSource } from '../config/databaseConfig';
import { UserRole } from '../entities/UserRole';

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
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};

export function checkRole(requiredRole: UserRole) {
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

export function checkOwnership(entityName: string, ownerField: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.payload as JwtPayload;

    if (payload.role === UserRole.ADMIN) {
      next();
    }

    const repo = AppDataSource.getRepository(entityName);
    const entity = await repo.findOne({
      where: { id: Number(req.params.id) },
      relations: [ownerField],
    } as any);

    if (!entity) {
      res.status(404).json({ message: `${entityName} not found` });
      return;
    }

    if (entity[ownerField]?.id !== payload.userId) {
      res.status(403).json({ message: 'Forbidden: Not your resource' });
    }

    next();
  };
}

export function blockAdminMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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
    const payload = verifyJwt(token);
    if (payload.role === UserRole.ADMIN) {
      res.status(403).json({ message: 'Admins cannot send messages' });
    }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
