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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const application_service_1 = require("./application.service");
const pipe_1 = require("../conception/pipe");
const application_dto_1 = require("./application.dto");
let ApplicationController = class ApplicationController {
    applicationsService;
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    findAll() {
        return this.applicationsService.applicationFindAll();
    }
    getApplication(id) {
        return this.applicationsService.applicationGetById(id);
    }
    create(dto) {
        return this.applicationsService.applicationCreate(dto);
    }
    update(id, dto) {
        return this.applicationsService.applicationUpdate(id, dto);
    }
    delete(id) {
        return this.applicationsService.applicationDelete(id);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все заявки' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список заявок успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить заявку по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заявка успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заявка не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID заявки' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "getApplication", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую заявку' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Заявка успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: application_dto_1.CreateApplicationsDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [application_dto_1.CreateApplicationsDto]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить заявку' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заявка успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заявка не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID заявки' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить заявку' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Заявка успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Заявка не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID заявки' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApplicationController.prototype, "delete", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, swagger_1.ApiTags)('Application'),
    (0, common_1.Controller)('application'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map