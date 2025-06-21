import { EducationService } from './education.service';
import { CreateEducationsDto, TUpdateEducationsDto } from './education.dto';
export declare class EducationController {
    private readonly educationsService;
    constructor(educationsService: EducationService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }[]>;
    getEducation(id: number): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateEducationsDto): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateEducationsDto): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__EducationClient<{
        id: number;
        start_date: Date;
        end_date: Date | null;
        resume_id: number;
        institution: string;
        degree: string;
        field_of_study: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
