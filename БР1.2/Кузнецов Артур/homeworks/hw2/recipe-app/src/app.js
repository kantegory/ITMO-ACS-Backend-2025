"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const AppDataSource_1 = require("./config/AppDataSource");
const UserRouter_1 = __importDefault(require("./routers/UserRouter"));
const RoleRouter_1 = __importDefault(require("./routers/RoleRouter"));
const SubscriptionRouter_1 = __importDefault(require("./routers/SubscriptionRouter"));
const RecipeRouter_1 = __importDefault(require("./routers/RecipeRouter"));
const IngredientRouter_1 = __importDefault(require("./routers/IngredientRouter"));
const RecipeIngredientRouter_1 = __importDefault(require("./routers/RecipeIngredientRouter"));
const SavedRecipeRouter_1 = __importDefault(require("./routers/SavedRecipeRouter"));
const LikeRouter_1 = __importDefault(require("./routers/LikeRouter"));
const CommentRouter_1 = __importDefault(require("./routers/CommentRouter"));
const RecipeStepRouter_1 = __importDefault(require("./routers/RecipeStepRouter"));
const RecipeDifficultyRouter_1 = __importDefault(require("./routers/RecipeDifficultyRouter"));
const DishTypeRouter_1 = __importDefault(require("./routers/DishTypeRouter"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const handler = (request, response) => {
    response.status(200).send({
        message: "Hello, world!",
    });
};
app.get("/", handler);
app.use("/users", UserRouter_1.default);
app.use("/roles", RoleRouter_1.default);
app.use("/subscriptions", SubscriptionRouter_1.default);
app.use("/recipes", RecipeRouter_1.default);
app.use("/ingredients", IngredientRouter_1.default);
app.use("/recipe-ingredients", RecipeIngredientRouter_1.default);
app.use("/saved-recipes", SavedRecipeRouter_1.default);
app.use("/likes", LikeRouter_1.default);
app.use("/comments", CommentRouter_1.default);
app.use("/recipe-steps", RecipeStepRouter_1.default);
app.use("/recipe-difficulties", RecipeDifficultyRouter_1.default);
app.use("/dish-types", DishTypeRouter_1.default);
AppDataSource_1.AppDataSource
    .initialize()
    .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    });
})
    .catch((error) => console.log(error));
