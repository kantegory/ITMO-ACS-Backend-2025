"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
exports.checkRole = checkRole;
exports.checkOwnership = checkOwnership;
exports.blockAdminMessages = blockAdminMessages;
const jwt_1 = require("../utils/jwt");
const User_1 = require("../entities/User");
const databaseConfig_1 = require("../config/databaseConfig");
const checkJwt = (req, res, next) => {
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
        const payload = (0, jwt_1.verifyJwt)(token);
        req.payload = payload;
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return;
    }
};
exports.checkJwt = checkJwt;
function checkRole(requiredRole) {
    return (req, res, next) => {
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
            const payload = (0, jwt_1.verifyJwt)(token);
            if (payload.role !== requiredRole) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            next();
        }
        catch (err) {
            res.status(401).json({ message: 'Invalid or expired token' });
            return;
        }
    };
}
function checkOwnership(entityName, ownerField) {
    return async (req, res, next) => {
        const payload = req.payload;
        if (payload.role === User_1.UserRole.ADMIN) {
            next();
        }
        const repo = databaseConfig_1.AppDataSource.getRepository(entityName);
        const entity = await repo.findOne({
            where: { id: Number(req.params.id) },
            relations: [ownerField],
        });
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
function blockAdminMessages(req, res, next) {
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
        const payload = (0, jwt_1.verifyJwt)(token);
        if (payload.role === User_1.UserRole.ADMIN) {
            res.status(403).json({ message: 'Admins cannot send messages' });
        }
        next();
    }
    catch {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}
