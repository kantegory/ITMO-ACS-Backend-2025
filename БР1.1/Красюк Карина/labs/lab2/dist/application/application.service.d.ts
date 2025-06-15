import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
import { CreateApplicationsDto, TUpdateApplicationsDto } from "./application.dto";
export declare class ApplicationService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    applicationFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        user_id: number;
        message: string | null;
        vacancy_id: number;
    }[]>;
    applicationGetById(id: number): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        user_id: number;
        message: string | null;
        vacancy_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    applicationCreate(dto: CreateApplicationsDto): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        user_id: number;
        message: string | null;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    applicationUpdate(id: number, dto: TUpdateApplicationsDto): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        user_id: number;
        message: string | null;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    applicationDelete(id: number): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        user_id: number;
        message: string | null;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
