"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let IndustryService = class IndustryService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    industryFindAll() {
        console.log(this.configService.get('MODE'));
        return this.prisma.industry.findMany();
    }
    industryGetById(id) {
        const industry = this.prisma.industry.findUnique({
            where: { id },
        });
        if (!industry) {
            throw new common_1.NotFoundException('industry not found');
        }
        return industry;
    }
    industryCreate(dto) {
        return this.prisma.industry.create({
            data: dto,
        });
    }
    industryUpdate(id, dto) {
        return this.prisma.industry.update({
            where: { id },
            data: dto,
        });
    }
    industryDelete(id) {
        return this.prisma.industry.delete({
            where: { id },
        });
    }
};
exports.IndustryService = IndustryService;
exports.IndustryService = IndustryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], IndustryService);
//# sourceMappingURL=industry.service.js.map