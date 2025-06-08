"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const User_1 = require("../entities/User");
const BaseController_1 = require("./BaseController");
const UserService_1 = require("../services/UserService");
const jwt_1 = require("../utils/jwt");
class UserControllerClass extends BaseController_1.BaseController {
    constructor() {
        super(databaseConfig_1.AppDataSource.getRepository(User_1.User));
        this.register = async (req, res) => {
            try {
                const user = await UserService_1.UserService.register(req.body);
                for (const key in user) {
                    if (key === 'password') {
                        delete user[key];
                    }
                }
                res.status(201).json(user);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const { user, token } = await UserService_1.UserService.login(email, password);
                const finalUser = {
                    id: user.id,
                    name: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                };
                res.status(200).json({ finalUser, token });
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
        this.changePassword = async (req, res) => {
            try {
                const { id } = req.params;
                const { password } = req.body;
                const authHeader = req.get('Authorization');
                if (!authHeader) {
                    res.status(401).json({ error: 'No Authorization header' });
                    return;
                }
                const [scheme, token] = authHeader.split(' ');
                if (scheme !== 'Bearer' || !token) {
                    res.status(401).json({ error: 'Malformed Authorization header' });
                }
                const payload = (0, jwt_1.verifyJwt)(token);
                if (!payload || payload.userId !== parseInt(id)) {
                    res
                        .status(403)
                        .json({ error: 'Forbidden: You can only change your own password' });
                }
                const user = await UserService_1.UserService.changePassword(parseInt(id), password);
                res.status(200).json(user);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        };
    }
}
exports.UserController = new UserControllerClass();
