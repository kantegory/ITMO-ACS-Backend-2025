import { ResumeService } from './resume.service';
import { CreateResumesDto, TUpdateResumesDto } from './resume.dto';
export declare class ResumeController {
    private readonly resumesService;
    constructor(resumesService: ResumeService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }[]>;
    getResume(id: number): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateResumesDto): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateResumesDto): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
