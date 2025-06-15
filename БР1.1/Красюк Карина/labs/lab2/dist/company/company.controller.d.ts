import { CompanyService } from './company.service';
import { CreateCompanysDto, TUpdateCompanysDto } from './company.dto';
export declare class CompanyController {
    private readonly companysService;
    constructor(companysService: CompanyService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }[]>;
    getUser(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
