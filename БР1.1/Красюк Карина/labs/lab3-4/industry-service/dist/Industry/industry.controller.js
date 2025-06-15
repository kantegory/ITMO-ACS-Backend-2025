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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const industry_service_1 = require("./industry.service");
const pipe_1 = require("../conception/pipe");
const industry_dto_1 = require("./industry.dto");
let IndustryController = class IndustryController {
    industrysService;
    constructor(industrysService) {
        this.industrysService = industrysService;
    }
    findAll() {
        return this.industrysService.industryFindAll();
    }
    getIndustry(id) {
        return this.industrysService.industryGetById(id);
    }
    create(dto) {
        return this.industrysService.industryCreate(dto);
    }
    update(id, dto) {
        return this.industrysService.industryUpdate(id, dto);
    }
    delete(id) {
        return this.industrysService.industryDelete(id);
    }
};
exports.IndustryController = IndustryController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все отрасли' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список отраслей успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IndustryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить отрасль по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отрасль успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отрасль не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID отрасли' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IndustryController.prototype, "getIndustry", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую отрасль' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Отрасль успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: industry_dto_1.CreateIndustrysDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [industry_dto_1.CreateIndustrysDto]),
    __metadata("design:returntype", void 0)
], IndustryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить отрасль' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отрасль успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отрасль не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID отрасли' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], IndustryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить отрасль' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Отрасль успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Отрасль не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID отрасли' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], IndustryController.prototype, "delete", null);
exports.IndustryController = IndustryController = __decorate([
    (0, swagger_1.ApiTags)('Industry'),
    (0, common_1.Controller)('industry'),
    __metadata("design:paramtypes", [industry_service_1.IndustryService])
], IndustryController);
//# sourceMappingURL=industry.controller.js.map