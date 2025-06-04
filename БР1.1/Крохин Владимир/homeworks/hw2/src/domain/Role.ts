import { Person } from "./Person";
import { User } from "./User";

export abstract class Role implements Person{
    constructor(
        public user: User
    ) {
    }
    
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