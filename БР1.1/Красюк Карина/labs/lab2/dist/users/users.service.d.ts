import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { CreateUsersDto, TUpdateUsersDto } from './users.dto';
export declare class UsersService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    userFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    userGetById(id: number): Promise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    userCreate(dto: CreateUsersDto): Promise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    userUpdate(id: number, dto: TUpdateUsersDto): import(".prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
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
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    generateToken(user: any): string;
}
