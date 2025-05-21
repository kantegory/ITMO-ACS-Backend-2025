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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const experience_1 = require("./experience");
const education_1 = require("./education");
let Resume = class Resume extends typeorm_1.BaseEntity {
};
exports.Resume = Resume;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "resume_id" }),
    __metadata("design:type", Number)
], Resume.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.resumes),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_1.User)
], Resume.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 256 }),
    __metadata("design:type", String)
], Resume.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Resume.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", name: "contact_info" }),
    __metadata("design:type", String)
], Resume.prototype, "contactInfo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Resume.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Resume.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => experience_1.Experience, (exp) => exp.resume),
    __metadata("design:type", Array)
], Resume.prototype, "experiences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => education_1.Education, (edu) => edu.resume),
    __metadata("design:type", Array)
], Resume.prototype, "educations", void 0);
exports.Resume = Resume = __decorate([
    (0, typeorm_1.Entity)({ name: "Resume" })
], Resume);
