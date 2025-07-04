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
exports.EducationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let EducationService = class EducationService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    educationFindAll() {
        console.log(this.configService.get('MODE'));
        return this.prisma.education.findMany();
    }
    educationGetById(id) {
        const education = this.prisma.education.findUnique({
            where: { id },
        });
        if (!education) {
            throw new common_1.NotFoundException('education not found');
        }
        return education;
    }
    educationCreate(dto) {
        return this.prisma.education.create({
            data: dto,
        });
    }
    educationUpdate(id, dto) {
        return this.prisma.education.update({
            where: { id },
            data: dto,
        });
    }
    educationDelete(id) {
        return this.prisma.education.delete({
            where: { id },
        });
    }
};
exports.EducationService = EducationService;
exports.EducationService = EducationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], EducationService);
//# sourceMappingURL=education.service.js.map