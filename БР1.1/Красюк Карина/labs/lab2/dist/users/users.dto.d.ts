import { Role } from "@prisma/client";
export declare class CreateUsersDto {
    email: string;
    password: string;
    role?: Role;
}
export type TUpdateUsersDto = Partial<CreateUsersDto>;
