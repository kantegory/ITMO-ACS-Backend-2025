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
exports.AppHealthController = exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    httpService;
    services = {
        user: 'http://localhost:3001',
        company: 'http://localhost:3002',
        industry: 'http://localhost:3003',
    };
    constructor(httpService) {
        this.httpService = httpService;
    }
    async get(req, res) {
        const { service } = req.params;
        this.logRequest(req, service);
        if (!this.services[service]) {
            return res
                .status(common_1.HttpStatus.NOT_FOUND)
                .json({ error: `Service "${service}" not found` });
        }
        const url = this.buildUrl(req, service);
        try {
            const response = await this.httpService.axiosRef.get(url, {
                headers: req.headers,
            });
            this.proxyResponse(res, response);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async post(req, res, body) {
        const { service } = req.params;
        this.logRequest(req, service, body);
        if (!this.services[service]) {
            return res
                .status(common_1.HttpStatus.NOT_FOUND)
                .json({ error: `Service "${service}" not found` });
        }
        const url = this.buildUrl(req, service);
        try {
            const response = await this.httpService.axiosRef.post(url, body, {
                headers: req.headers,
            });
            this.proxyResponse(res, response);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    buildUrl(req, service) {
        const baseUrl = this.services[service];
        let path = req.url.replace(`/api/${service}`, '');
        if (!path || path === '/')
            path = '';
        const finalUrl = `${baseUrl}${path}`;
        console.log(`Proxying to: ${finalUrl}`);
        return finalUrl;
    }
    proxyResponse(res, response) {
        const setCookies = response.headers['set-cookie'];
        if (setCookies) {
            res.header('Set-Cookie', setCookies);
        }
        res.status(response.status).json(response.data);
    }
    handleError(res, error) {
        const status = error.response?.status || 500;
        const data = error.response?.data || { error: 'Internal Server Error' };
        console.error(` Error in gateway:`, error.message);
        res.status(status).json(data);
    }
    logRequest(req, service, body) {
        console.log(`📨 ${req.method} request to service: ${service}`);
        console.log(`   URL: ${req.originalUrl}`);
        if (body) {
            console.log(`   Body:`, JSON.stringify(body, null, 2));
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(':service/*'),
    (0, swagger_1.ApiTags)('gateway'),
    (0, swagger_1.ApiOperation)({ summary: 'Proxy GET-запросы к микросервисам' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Успешный ответ от микросервиса' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Сервис не найден' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(':service/*'),
    (0, swagger_1.ApiTags)('gateway'),
    (0, swagger_1.ApiOperation)({ summary: 'Proxy POST-запросы к микросервисам' }),
    (0, swagger_1.ApiBody)({ description: 'Данные для отправки в микросервис' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ресурс успешно создан' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Ошибка валидации или запроса' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "post", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppController);
let AppHealthController = class AppHealthController {
    check() {
        return {
            status: 'Gateway is running',
            timestamp: new Date(),
        };
    }
};
exports.AppHealthController = AppHealthController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppHealthController.prototype, "check", null);
exports.AppHealthController = AppHealthController = __decorate([
    (0, common_1.Controller)('health')
], AppHealthController);
//# sourceMappingURL=app.controller.js.map