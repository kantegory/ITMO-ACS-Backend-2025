import * as express from "express"
import { dataSource } from "./dataSource"
import userRouter from "./routes/users"
import recipeRouter from "./routes/recipes"
import ingredientRouter from "./routes/ingredients"
import recipeIngredientRouter from "./routes/recipeIngredients"
import recipeStepRouter from "./routes/recipeSteps"
import savedRecipeRouter from "./routes/savedRecipes"
import likeRouter from "./routes/likes"
import subscriptionRouter from "./routes/subscriptions"

dataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()

app.use(express.json())

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);
app.use("/recipes-ingredients", recipeIngredientRouter);
app.use("/recipe-steps", recipeStepRouter);
app.use("/saved-recipes", savedRecipeRouter);
app.use("/likes", likeRouter);
app.use("/subscriptions", subscriptionRouter);

app.listen(3000)
