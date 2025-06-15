import { IndustryService } from './industry.service';
import { CreateIndustrysDto, TUpdateIndustrysDto } from './industry.dto';
export declare class IndustryController {
    private readonly industrysService;
    constructor(industrysService: IndustryService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
    }[]>;
    getIndustry(id: number): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateIndustrysDto): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: TUpdateIndustrysDto): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    delete(id: number): import(".prisma/client").Prisma.Prisma__IndustryClient<{
        name: string;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
