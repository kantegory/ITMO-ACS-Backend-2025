import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
import { CreateEducationsDto, TUpdateEducationsDto } from "./education.dto";
export declare class EducationService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    educationFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }[]>;
    educationGetById(id: number): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    educationCreate(dto: CreateEducationsDto): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    educationUpdate(id: number, dto: TUpdateEducationsDto): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    educationDelete(id: number): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
