import { CompanyService } from './company.service';
import { CreateCompanysDto, TUpdateCompanysDto } from './company.dto';
export declare class CompanyController {
    private readonly companysService;
    constructor(companysService: CompanyService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    getUser(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
