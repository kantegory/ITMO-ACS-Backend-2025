import { ApplicationService } from './application.service';
import { CreateApplicationsDto, TUpdateApplicationsDto } from './application.dto';
export declare class ApplicationController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        message: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        vacancy_id: number;
    }[]>;
    getApplication(id: number): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        message: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        vacancy_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateApplicationsDto): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        message: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateApplicationsDto): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        message: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        user_id: number;
        message: string | null;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        vacancy_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
