"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyModule = void 0;
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const vacancy_controller_1 = require("./vacancy.controller");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let VacancyModule = class VacancyModule {
};
exports.VacancyModule = VacancyModule;
exports.VacancyModule = VacancyModule = __decorate([
    (0, common_1.Module)({
        controllers: [vacancy_controller_1.VacancyController],
        providers: [vacancy_service_1.VacancyService, prisma_service_1.PrismaService, config_1.ConfigService],
    })
], VacancyModule);
//# sourceMappingURL=vacancy.module.js.map