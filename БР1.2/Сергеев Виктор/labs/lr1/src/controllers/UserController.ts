import { BaseCRUDController } from "../common/BaseCRUDController";
import { User } from "../models/User";

export class UserController extends BaseCRUDController<User> {
    constructor () {
        super(User);
    }
}