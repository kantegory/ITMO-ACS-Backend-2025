import { UserModel } from "./user.model";

export abstract class RoleModel {
    constructor(
        public user: UserModel
    ) {}

    get fullName(): string {
        return this.user.fullName;
    }
    get firstName(): string {
        return this.user.firstName;
    }
    set firstName(firstName: string) {
        this.user.firstName = firstName;
    }
    get lastName(): string {
        return this.user.lastName;
    }
    set lastName(lastName: string) {
        this.user.lastName = lastName;
    }
} 