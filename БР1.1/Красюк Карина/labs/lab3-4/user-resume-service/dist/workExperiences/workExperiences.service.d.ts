import { PrismaService } from "../prisma.service";
import { CreateWorkExperiencesDto, TUpdateWorkExperiencesDto } from "./workExperiences.dto";
import { ConfigService } from "@nestjs/config";
export declare class WorkExperiencesService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    workExperienceFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        company_name: string;
        position: string;
    }[]>;
    workExperienceGetById(id: number): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        company_name: string;
        position: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    workExperienceCreate(dto: CreateWorkExperiencesDto): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        company_name: string;
        position: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    workExperienceUpdate(id: number, dto: TUpdateWorkExperiencesDto): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        company_name: string;
        position: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    workExperienceDelete(id: number): import(".prisma/client").Prisma.Prisma__WorkExperienceClient<{
        description: string | null;
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        company_name: string;
        position: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
