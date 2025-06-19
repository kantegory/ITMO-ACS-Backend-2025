import { Request, Response, NextFunction } from 'express';
import fetch from 'node-fetch';

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   responses:
 *     UnauthorizedError:
 *       description: Неверные или отсутствующие учетные данные
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *
 * security:
 *   - bearerAuth: []
 */

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
        const response = await fetch(`${userServiceUrl}/api/validate-token`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { user } = await response.json();
        (req as any).user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: 'Authentication failed' });
    }
};

export default authMiddleware;