import { PrismaService } from '../prisma.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    userFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }[]>;
    userGetById(id: number): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    userCreate(dto: CreateUsersDto): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    userUpdate(id: number, dto: TUpdateUsersDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    userDelete(id: number): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
}
