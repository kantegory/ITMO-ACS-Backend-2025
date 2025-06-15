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
exports.VacancyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vacancy_service_1 = require("./vacancy.service");
const pipe_1 = require("../conception/pipe");
const vacancy_dto_1 = require("./vacancy.dto");
let VacancyController = class VacancyController {
    vacancysService;
    constructor(vacancysService) {
        this.vacancysService = vacancysService;
    }
    findAll() {
        return this.vacancysService.vacancyFindAll();
    }
    getUser(id) {
        return this.vacancysService.vacancyGetById(id);
    }
    create(dto) {
        return this.vacancysService.vacancyCreate(dto);
    }
    update(id, dto) {
        return this.vacancysService.vacancyUpdate(id, dto);
    }
    delete(id) {
        return this.vacancysService.userDelete(id);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все вакансии' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список вакансий успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить вакансию по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Вакансия успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Вакансия не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID вакансии' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую вакансию' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Вакансия успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: vacancy_dto_1.CreateVacancysDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vacancy_dto_1.CreateVacancysDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить вакансию' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Вакансия успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Вакансия не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID вакансии' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить вакансию' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Вакансия успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Вакансия не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID вакансии' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "delete", null);
exports.VacancyController = VacancyController = __decorate([
    (0, swagger_1.ApiTags)('Vacancies'),
    (0, common_1.Controller)('vacancys'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map