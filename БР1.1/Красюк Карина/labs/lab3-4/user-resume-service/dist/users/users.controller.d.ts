import { UsersService } from './users.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }[]>;
    getUser(id: number): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    create(dto: CreateUsersDto): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    update(id: number, dto: TUpdateUsersDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
