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
exports.WorkExperiencesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const workExperiences_service_1 = require("./workExperiences.service");
const pipe_1 = require("../conception/pipe");
const workExperiences_dto_1 = require("./workExperiences.dto");
let WorkExperiencesController = class WorkExperiencesController {
    workExperiencesService;
    constructor(workExperiencesService) {
        this.workExperiencesService = workExperiencesService;
    }
    findAll() {
        return this.workExperiencesService.workExperienceFindAll();
    }
    getWorkExperience(id) {
        return this.workExperiencesService.workExperienceGetById(id);
    }
    create(dto) {
        return this.workExperiencesService.workExperienceCreate(dto);
    }
    update(id, dto) {
        return this.workExperiencesService.workExperienceUpdate(id, dto);
    }
    delete(id) {
        return this.workExperiencesService.workExperienceDelete(id);
    }
};
exports.WorkExperiencesController = WorkExperiencesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить весь опыт работы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список опыта работы успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkExperiencesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить опыт работы по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Опыт работы успешно получен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Опыт работы не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID опыта работы' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorkExperiencesController.prototype, "getWorkExperience", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новый опыт работы' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Опыт работы успешно создан' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: workExperiences_dto_1.CreateWorkExperiencesDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [workExperiences_dto_1.CreateWorkExperiencesDto]),
    __metadata("design:returntype", void 0)
], WorkExperiencesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить опыт работы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Опыт работы успешно обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Опыт работы не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID опыта работы' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WorkExperiencesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить опыт работы' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Опыт работы успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Опыт работы не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID опыта работы' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorkExperiencesController.prototype, "delete", null);
exports.WorkExperiencesController = WorkExperiencesController = __decorate([
    (0, swagger_1.ApiTags)('Work Experiences'),
    (0, common_1.Controller)('workExperiences'),
    __metadata("design:paramtypes", [workExperiences_service_1.WorkExperiencesService])
], WorkExperiencesController);
//# sourceMappingURL=workExperiences.controller.js.map