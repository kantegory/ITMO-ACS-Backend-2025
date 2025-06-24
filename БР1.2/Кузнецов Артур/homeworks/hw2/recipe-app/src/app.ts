import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/AppDataSource";
import userRouter from "./routers/UserRouter";
import roleRouter from "./routers/RoleRouter";
import subscriptionRouter from "./routers/SubscriptionRouter";
import recipeRouter from "./routers/RecipeRouter";
import ingredientRouter from "./routers/IngredientRouter";
import recipeIngredientRouter from "./routers/RecipeIngredientRouter";
import savedRecipeRouter from "./routers/SavedRecipeRouter";
import likeRouter from "./routers/LikeRouter";
import commentRouter from "./routers/CommentRouter";
import recipeStepRouter from "./routers/RecipeStepRouter";
import recipeDifficultyRouter from "./routers/RecipeDifficultyRouter";
import dishTypeRouter from "./routers/DishTypeRouter";

const app = express();
const PORT = 3000;

app.use(express.json());

const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: "Hello, world!",
    });
};

app.get("/", handler);
app.use("/users", userRouter);
app.use("/roles", roleRouter);
app.use("/subscriptions", subscriptionRouter);
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);
app.use("/recipe-ingredients", recipeIngredientRouter);
app.use("/saved-recipes", savedRecipeRouter);
app.use("/likes", likeRouter);
app.use("/comments", commentRouter);
app.use("/recipe-steps", recipeStepRouter);
app.use("/recipe-difficulties", recipeDifficultyRouter);
app.use("/dish-types", dishTypeRouter);

AppDataSource
.initialize()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    });
})
.catch((error) => console.log(error));
