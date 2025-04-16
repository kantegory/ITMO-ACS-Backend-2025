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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Recipes_1 = require("./Recipes");
const Comments_1 = require("./Comments");
const Likes_1 = require("./Likes");
const SavedRecipes_1 = require("./SavedRecipes");
const Subscriptions_1 = require("./Subscriptions");
const Roles_1 = require("./Roles");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (role) => role.users),
    __metadata("design:type", Roles_1.Roles)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Users.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Users.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "profile_picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Recipes_1.Recipes, (recipe) => recipe.user),
    __metadata("design:type", Array)
], Users.prototype, "recipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments_1.Comments, (comment) => comment.user),
    __metadata("design:type", Array)
], Users.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes_1.Likes, (like) => like.user),
    __metadata("design:type", Array)
], Users.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SavedRecipes_1.SavedRecipes, (savedRecipe) => savedRecipe.user),
    __metadata("design:type", Array)
], Users.prototype, "savedRecipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subscriptions_1.Subscriptions, (subscription) => subscription.follower),
    __metadata("design:type", Array)
], Users.prototype, "followingSubscriptions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subscriptions_1.Subscriptions, (subscription) => subscription.following),
    __metadata("design:type", Array)
], Users.prototype, "followerSubscriptions", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)()
], Users);
