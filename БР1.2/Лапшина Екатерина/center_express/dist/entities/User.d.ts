import { Contract } from "./Contract";
export declare enum UserRole {
    CLIENT = "client",
    AGENT = "agent",
    ADMIN = "admin"
}
export declare class User {
    UserID: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    Passport: string;
    Phone: string;
    BirthDate: Date;
    Photo: string;
    is_staff: boolean;
    is_active: boolean;
    is_superuser: boolean;
    last_login: Date;
    date_joined: Date;
    updated_at: Date;
    agentContracts: Contract[];
    clientContracts: Contract[];
}
//# sourceMappingURL=User.d.ts.map