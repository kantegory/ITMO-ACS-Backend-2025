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
import authMiddleware from "./middleware/auth.middleware";

const router = Router();

// Users
router.post('/login', userController.loginUser);
router.post('/register', userController.createUser);

router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.get("/users/email/:email", authMiddleware, userController.getUserByEmail);
router.post("/users/create", authMiddleware, userController.createUser);
router.put("/users/update/:id", authMiddleware, userController.updateUser);
router.delete("/users/delete/:id", authMiddleware, userController.deleteUser);
// Recipes
router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:id", recipeController.getRecipeById);
router.post("/recipes/create", authMiddleware, recipeController.createRecipe);
router.put("/recipes/update/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/recipes/delete/:id", authMiddleware, recipeController.deleteRecipe);
// Ratings
router.get("/ratings", ratingController.getAllRatings);
router.get("/ratings/:id", ratingController.getRatingById);
router.post("/ratings/create", authMiddleware, ratingController.createRating);
router.put("/ratings/update/:id", authMiddleware, ratingController.updateRating);
router.delete("/ratings/delete/:id", authMiddleware, ratingController.deleteRating);
// Files
router.get("/files", fileController.getAllFiles);
router.get("/files/:id", fileController.getFileById);
router.post("/files/create", authMiddleware, fileController.createFile);
router.put("/files/update/:id", authMiddleware, fileController.updateFile);
router.delete("/files/delete/:id", authMiddleware, fileController.deleteFile);
// Favourites
router.get("/favourites/user/:userId", authMiddleware, favouriteController.getAllFavourites);
router.get("/favourites/:id", authMiddleware, favouriteController.getFavouriteById);
router.post("/favourites/create", authMiddleware, favouriteController.addFavourite);
router.put("/favourites/update/:id", authMiddleware, favouriteController.updateFavourite);
router.delete("/favourites/delete/:id", authMiddleware, favouriteController.removeFavourite);
// Comments
router.get("/comments", commentController.getAllComments);
router.get("/comments/:id", commentController.getCommentById);
router.post("/comments/create", authMiddleware, commentController.createComment);
router.put("/comments/update/:id", authMiddleware, commentController.updateComment);
router.delete("/comments/delete/:id", authMiddleware, commentController.deleteComment);
// Collections
router.get("/collections", authMiddleware, collectionController.getAllCollections);
router.get("/collections/:id", authMiddleware, collectionController.getCollectionById);
router.post("/collections/create", authMiddleware, collectionController.createCollection);
router.put("/collections/update/:id", authMiddleware, collectionController.updateCollection);
router.delete("/collections/delete/:id", authMiddleware, collectionController.deleteCollection);
// Categories
router.get("/categories", categoryController.getAllCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.post("/categories/create", authMiddleware, categoryController.createCategory);
router.put("/categories/update/:id", authMiddleware, categoryController.updateCategory);
router.delete("/categories/delete/:id", authMiddleware, categoryController.deleteCategory);
// Articles
router.get("/articles", articleController.getAllArticles);
router.get("/articles/:id", articleController.getArticleById);
router.post("/articles/create", authMiddleware, articleController.createArticle);
router.put("/articles/update/:id", authMiddleware, articleController.updateArticle);
router.delete("/articles/delete/:id", authMiddleware, articleController.deleteArticle);

export default router;
