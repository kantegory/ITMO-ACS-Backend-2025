import { PrismaService } from "../prisma.service";
import { CreateIndustrysDto, TUpdateIndustrysDto } from "./industry.dto";
import { ConfigService } from "@nestjs/config";
export declare class IndustryService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    industryFindAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    industryGetById(id: number): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    industryCreate(dto: CreateIndustrysDto): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    industryUpdate(id: number, dto: TUpdateIndustrysDto): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    industryDelete(id: number): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
