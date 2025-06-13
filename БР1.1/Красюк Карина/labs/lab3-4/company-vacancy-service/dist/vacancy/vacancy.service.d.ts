import { PrismaService } from "../prisma.service";
import { CreateVacancysDto, TUpdateVacancysDto } from "./vacancy.dto";
import { ConfigService } from "@nestjs/config";
export declare class VacancyService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    vacancyFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        requirements: string | null;
        salary_from: number | null;
        salary_to: number | null;
        experience: string | null;
        company_id: number;
    }[]>;
    vacancyGetById(id: number): import(".prisma/client").Prisma.Prisma__VacancyClient<{
        description: string | null;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        requirements: string | null;
        salary_from: number | null;
        salary_to: number | null;
        experience: string | null;
        company_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    vacancyCreate(dto: CreateVacancysDto): import(".prisma/client").Prisma.Prisma__VacancyClient<{
        description: string | null;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        requirements: string | null;
        salary_from: number | null;
        salary_to: number | null;
        experience: string | null;
        company_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    vacancyUpdate(id: number, dto: TUpdateVacancysDto): import(".prisma/client").Prisma.Prisma__VacancyClient<{
        description: string | null;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        requirements: string | null;
        salary_from: number | null;
        salary_to: number | null;
        experience: string | null;
        company_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    userDelete(id: number): import(".prisma/client").Prisma.Prisma__VacancyClient<{
        description: string | null;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        title: string;
        requirements: string | null;
        salary_from: number | null;
        salary_to: number | null;
        experience: string | null;
        company_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
