import { UsersService } from './users.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';
import { LoginDto } from "./login.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getUser(id: number): Promise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    create(dto: CreateUsersDto): Promise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: number, dto: TUpdateUsersDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    login(dto: LoginDto): Promise<{
        token: string;
    }>;
}
