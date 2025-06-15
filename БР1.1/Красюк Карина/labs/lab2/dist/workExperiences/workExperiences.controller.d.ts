import { WorkExperiencesService } from './workExperiences.service';
import { CreateWorkExperiencesDto, TUpdateWorkExperiencesDto } from './workExperiences.dto';
export declare class WorkExperiencesController {
    private readonly workExperiencesService;
    constructor(workExperiencesService: WorkExperiencesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        id: number;
        company_name: string;
        position: string;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
    }[]>;
    getWorkExperience(id: number): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        company_name: string;
        position: string;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateWorkExperiencesDto): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        company_name: string;
        position: string;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateWorkExperiencesDto): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        company_name: string;
        position: string;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        company_name: string;
        position: string;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
