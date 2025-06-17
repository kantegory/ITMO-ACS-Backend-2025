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
exports.Workout = void 0;
const typeorm_1 = require("typeorm");
const WorkoutPlan_1 = require("./WorkoutPlan");
const WorkoutCategory_1 = require("./WorkoutCategory");
let Workout = class Workout {
};
exports.Workout = Workout;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Workout.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Workout.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Workout.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "video_url", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Workout.prototype, "instruction", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WorkoutPlan_1.WorkoutPlan, (plan) => plan.workout),
    __metadata("design:type", Array)
], Workout.prototype, "workoutPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => WorkoutCategory_1.WorkoutCategory, (category) => category.workout),
    __metadata("design:type", Array)
], Workout.prototype, "workoutCategories", void 0);
exports.Workout = Workout = __decorate([
    (0, typeorm_1.Entity)()
], Workout);
