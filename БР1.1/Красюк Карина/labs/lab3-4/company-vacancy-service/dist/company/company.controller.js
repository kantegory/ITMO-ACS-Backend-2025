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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const company_service_1 = require("./company.service");
const pipe_1 = require("../conception/pipe");
const company_dto_1 = require("./company.dto");
let CompanyController = class CompanyController {
    companysService;
    constructor(companysService) {
        this.companysService = companysService;
    }
    findAll() {
        return this.companysService.companyFindAll();
    }
    getUser(id) {
        return this.companysService.companyGetById(id);
    }
    create(dto) {
        return this.companysService.companyCreate(dto);
    }
    update(id, dto) {
        return this.companysService.companyUpdate(id, dto);
    }
    delete(id) {
        return this.companysService.companyDelete(id);
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить все компании' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список компаний успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить компанию по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания успешно получена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID компании' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать новую компанию' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Компания успешно создана' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: company_dto_1.CreateCompanysDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_dto_1.CreateCompanysDto]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить компанию' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания успешно обновлена' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID компании' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить компанию' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Компания успешно удалена' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Компания не найдена' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID компании' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "delete", null);
exports.CompanyController = CompanyController = __decorate([
    (0, swagger_1.ApiTags)('Company'),
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map