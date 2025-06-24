import { Router } from "express";
import { userController } from "./controllers/userController";
import { recipeController } from "./controllers/recipeController";
import { ratingController } from "./controllers/ratingController";
import { fileController } from "./controllers/fileController";
import { favouriteController } from "./controllers/favouriteController";
import { commentController } from "./controllers/commentController";
import { collectionController } from "./controllers/collectionController";
import { categoryController } from "./controllers/categoryController";
import { articleController } from "./controllers/articleController";

const router = Router();

// Users
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.post("/users/create", userController.createUser);
router.put("/users/update/:id", userController.updateUser);
router.delete("/users/delete/:id", userController.deleteUser);
// Recipes
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getRecipeById);
router.post("/recipes/create", recipeController.createRecipe);
router.put("/recipes/update/:id", recipeController.updateRecipe);
router.delete("/recipes/delete/:id", recipeController.deleteRecipe);
// Ratings
router.get("/ratings", ratingController.getAllRatings);
router.get("/ratings/:id", ratingController.getRatingById);
router.post("/ratings/create", ratingController.createRating);
router.put("/ratings/update/:id", ratingController.updateRating);
router.delete("/ratings/delete/:id", ratingController.deleteRating);
// Files
router.get("/files", fileController.getAllFiles);
router.get("/files/:id", fileController.getFileById);
router.post("/files/create", fileController.createFile);
router.put("/files/update/:id", fileController.updateFile);
router.delete("/files/delete/:id", fileController.deleteFile);
// Favourites
router.get("/favourites/user/:userId", favouriteController.getAllFavourites);
router.get("/favourites/:id", favouriteController.getFavouriteById);
router.post("/favourites/create", favouriteController.addFavourite);
router.put("/favourites/update/:id", favouriteController.updateFavourite);
router.delete("/favourites/delete/:id", favouriteController.removeFavourite);
// Comments
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getCommentById);
router.post("/comments/create", commentController.createComment);
router.put("/comments/update/:id", commentController.updateComment);
router.delete("/comments/delete/:id", commentController.deleteComment);
// Collections
router.get("/collections", collectionController.getAllCollections);
router.get("/collections/:id", collectionController.getCollectionById);
router.post("/collections/create", collectionController.createCollection);
router.put("/collections/update/:id", collectionController.updateCollection);
router.delete("/collections/delete/:id", collectionController.deleteCollection);
// Categories
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories/create", categoryController.createCategory);
router.put("/categories/update/:id", categoryController.updateCategory);
router.delete("/categories/delete/:id", categoryController.deleteCategory);
// Articles
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.post("/articles/create", articleController.createArticle);
router.put("/articles/update/:id", articleController.updateArticle);
router.delete("/articles/delete/:id", articleController.deleteArticle);

export default router;
