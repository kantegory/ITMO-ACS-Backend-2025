import { RequestHandler } from 'express';
import userService from '../services/user.service';

class UserController {
    getUserById: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);
            res.status(200).json(user);
        } catch (err) {
            next(err)
        }
    };

    getUserByMail: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const mail = req.params.mail;
            const user = await userService.getUserByMail(mail);
            res.status(200).json(user);
        } catch (err) {
            next(err)
        }
    };
}

export default new UserController();
