import { RequestHandler } from 'express';
import { UserEntity } from '../models/user.entity';
import dataSource from '../config/data-source';

class UserController {
    private repository = dataSource.getRepository(UserEntity);

    me: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const userId = (req as any).userId;
            const user = await this.repository.findOneBy({ id: userId });
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };

    getUserById: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.repository.findOneBy({ id });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };

    getUserByMail: RequestHandler = async (req, res, next): Promise<void> => {
        try {
            const mail = req.params.mail;
            const user = await this.repository.findOneBy({ mail: mail });
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    };
}

export default new UserController();
