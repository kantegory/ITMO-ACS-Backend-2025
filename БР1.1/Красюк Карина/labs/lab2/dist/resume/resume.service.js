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
exports.ResumeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let ResumeService = class ResumeService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    resumeFindAll() {
        console.log(this.configService.get('MODE'));
        return this.prisma.resume.findMany();
    }
    resumeGetById(id) {
        const resume = this.prisma.resume.findUnique({
            where: { id },
        });
        if (!resume) {
            throw new common_1.NotFoundException('resume not found');
        }
        return resume;
    }
    resumeCreate(dto) {
        return this.prisma.resume.create({
            data: dto,
        });
    }
    resumeUpdate(id, dto) {
        return this.prisma.resume.update({
            where: { id },
            data: dto,
        });
    }
    resumeDelete(id) {
        return this.prisma.resume.delete({
            where: { id },
        });
    }
};
exports.ResumeService = ResumeService;
exports.ResumeService = ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], ResumeService);
//# sourceMappingURL=resume.service.js.map