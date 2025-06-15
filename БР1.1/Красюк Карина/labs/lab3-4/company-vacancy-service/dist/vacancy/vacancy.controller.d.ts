import { VacancyService } from './vacancy.service';
import { CreateVacancysDto, TUpdateVacancysDto } from './vacancy.dto';
export declare class VacancyController {
    private readonly vacancysService;
    constructor(vacancysService: VacancyService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    getUser(id: number): import(".prisma/client").Prisma.Prisma__VacancyClient<{
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
    create(dto: CreateVacancysDto): import(".prisma/client").Prisma.Prisma__VacancyClient<{
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
    update(id: number, dto: TUpdateVacancysDto): import(".prisma/client").Prisma.Prisma__VacancyClient<{
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
    delete(id: number): import(".prisma/client").Prisma.Prisma__VacancyClient<{
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
