import { PrismaService } from "../prisma.service";
import { CreateCompanysDto, TUpdateCompanysDto } from "./company.dto";
import { ConfigService } from "@nestjs/config";
export declare class CompanyService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    companyFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    companyGetById(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyCreate(dto: CreateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyUpdate(id: number, dto: TUpdateCompanysDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        name: string;
        description: string | null;
        website: string | null;
        user_id: number;
        industry_id: number | null;
        id: number;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    companyDelete(id: number): import(".prisma/client").Prisma.Prisma__CompanyClient<{
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
