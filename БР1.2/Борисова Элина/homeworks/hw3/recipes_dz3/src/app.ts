import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/dataSource";
import recipeRoutes from "./routes/recipes";
import ingredientRoutes from "./routes/ingredients";
import commentRoutes from "./routes/comments";
import likeRoutes from "./routes/likes";
import subscriptionRoutes from "./routes/subscriptions";
import recipeCategoryRoutes from "./routes/recipeCategories";
import recipeIngredientRoutes from "./routes/recipeIngredients";
import recipeStepRoutes from "./routes/recipeSteps";
import userRoutes from "./routes/users";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();
const PORT = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.use(express.json());
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/recipe-categories", recipeCategoryRoutes);
app.use("/recipe-ingredients", recipeIngredientRoutes);
app.use("/recipe-steps", recipeStepRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });