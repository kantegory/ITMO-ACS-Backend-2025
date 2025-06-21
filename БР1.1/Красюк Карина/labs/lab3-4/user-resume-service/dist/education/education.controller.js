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
exports.EducationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const education_service_1 = require("./education.service");
const pipe_1 = require("../conception/pipe");
const education_dto_1 = require("./education.dto");
let EducationController = class EducationController {
    educationsService;
    constructor(educationsService) {
        this.educationsService = educationsService;
    }
    findAll() {
        return this.educationsService.educationFindAll();
    }
    getEducation(id) {
        return this.educationsService.educationGetById(id);
    }
    create(dto) {
        return this.educationsService.educationCreate(dto);
    }
    update(id, dto) {
        return this.educationsService.educationUpdate(id, dto);
    }
    delete(id) {
        return this.educationsService.educationDelete(id);
    }
};
exports.EducationController = EducationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все записи об образовании' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список записей об образовании успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить запись об образовании по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Запись об образовании успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Запись об образовании не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID записи об образовании' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "getEducation", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую запись об образовании' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Запись об образовании успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: education_dto_1.CreateEducationsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [education_dto_1.CreateEducationsDto]),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить запись об образовании' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Запись об образовании успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Запись об образовании не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID записи об образовании' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить запись об образовании' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Запись об образовании успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Запись об образовании не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID записи об образовании' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EducationController.prototype, "delete", null);
exports.EducationController = EducationController = __decorate([
    (0, swagger_1.ApiTags)('Education'),
    (0, common_1.Controller)('educations'),
    __metadata("design:paramtypes", [education_service_1.EducationService])
], EducationController);
//# sourceMappingURL=education.controller.js.map