"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryModule = void 0;
const common_1 = require("@nestjs/common");
const industry_service_1 = require("./industry.service");
const industry_controller_1 = require("./industry.controller");
const prisma_service_1 = require("../prisma.service");
const config_1 = require("@nestjs/config");
let IndustryModule = class IndustryModule {
};
exports.IndustryModule = IndustryModule;
exports.IndustryModule = IndustryModule = __decorate([
    (0, common_1.Module)({
        controllers: [industry_controller_1.IndustryController],
        providers: [industry_service_1.IndustryService, prisma_service_1.PrismaService, config_1.ConfigService],
    })
], IndustryModule);
//# sourceMappingURL=industry.module.js.map