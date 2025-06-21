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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const pipe_1 = require("../conception/pipe");
const users_dto_1 = require("./users.dto");
const login_dto_1 = require("./login.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.userFindAll();
    }
    getUser(id) {
        return this.usersService.userGetById(id);
    }
    create(dto) {
        return this.usersService.userCreate(dto);
    }
    update(id, dto) {
        return this.usersService.userUpdate(id, dto);
    }
    delete(id) {
        return this.usersService.userDelete(id);
    }
    async login(dto) {
        const user = await this.usersService.validateUser(dto.email, dto.password);
        const token = this.usersService.generateToken(user);
        return { token };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Получить всех пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Список пользователей успешно получен' }),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Получить пользователя по ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Пользователь успешно получен' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID пользователя' }),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Создать нового пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Пользователь успешно создан' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiBody)({ type: users_dto_1.CreateUsersDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.CreateUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Обновить пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Пользователь успешно обновлен' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Неверные данные' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID пользователя' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Пользователь успешно удален' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Пользователь не найден' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'ID пользователя' }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id', pipe_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Вход пользователя и получение JWT-токена' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'JWT-токен успешно получен' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Неверный email или пароль' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map