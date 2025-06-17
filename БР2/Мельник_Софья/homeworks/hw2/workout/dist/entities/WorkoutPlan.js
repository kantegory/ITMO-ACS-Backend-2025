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
exports.WorkoutPlan = void 0;
const typeorm_1 = require("typeorm");
const Plan_1 = require("./Plan");
const Workout_1 = require("./Workout");
let WorkoutPlan = class WorkoutPlan {
};
exports.WorkoutPlan = WorkoutPlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WorkoutPlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plan_1.Plan, (plan) => plan.workoutPlans),
    __metadata("design:type", Plan_1.Plan)
], WorkoutPlan.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Workout_1.Workout, (workout) => workout.workoutPlans),
    __metadata("design:type", Workout_1.Workout)
], WorkoutPlan.prototype, "workout", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkoutPlan.prototype, "day_of_week", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkoutPlan.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkoutPlan.prototype, "calories_burned", void 0);
exports.WorkoutPlan = WorkoutPlan = __decorate([
    (0, typeorm_1.Entity)()
], WorkoutPlan);
