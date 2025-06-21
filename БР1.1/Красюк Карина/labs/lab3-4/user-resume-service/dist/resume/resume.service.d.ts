import { PrismaService } from "../prisma.service";
import { CreateResumesDto, TUpdateResumesDto } from "./resume.dto";
import { ConfigService } from "@nestjs/config";
export declare class ResumeService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    resumeFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }[]>;
    resumeGetById(id: number): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    resumeCreate(dto: CreateResumesDto): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    resumeUpdate(id: number, dto: TUpdateResumesDto): import(".prisma/client").Prisma.Prisma__ResumeClient<{
        title: string;
        id: number;
        created_at: Date;
        updated_at: Date;
        experience_summary: string | null;
        salary_expectations: number | null;
        skills: string | null;
        user_id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    resumeDelete(id: number): import(".prisma/client").Prisma.Prisma__ResumeClient<{
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
