import {RequestHandler, response} from "express";
import {UserService} from "../services/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUserById: RequestHandler = async (request, response) => {
        const id = request.params.id;
        const user = await this.userService.getById(id);
        if (!user) {
            response.status(404).json({message: "User not found"});
        }
        response.status(200).json(user);

    };

    getUserByMail: RequestHandler = async (request, response) => {
        const mail = request.params.mail;
        const user = await this.userService.getByEmail(mail);
        if (!user) {
            response.status(404).json({message: "User not found"});
        }
        response.status(200).json(user);
    };
}