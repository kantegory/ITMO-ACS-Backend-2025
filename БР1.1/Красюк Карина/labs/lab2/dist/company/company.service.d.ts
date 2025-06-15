import { PrismaService } from "../prisma.service";
import { CreateCompanysDto, TUpdateCompanysDto } from "./company.dto";
import { ConfigService } from "@nestjs/config";
export declare class CompanyService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    companyFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }[]>;
    companyGetById(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyCreate(dto: CreateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyUpdate(id: number, dto: TUpdateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        description: string | null;
        id: number;
        created_at: Date;
        updated_at: Date;
        name: string;
        industry_id: number | null;
        user_id: number;
        website: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyDelete(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
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
