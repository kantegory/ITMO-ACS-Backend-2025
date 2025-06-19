import express from "express";
import UserController from "./controllers/UserController";
import RouteController from "./controllers/RouteController";
import RoutePointController from "./controllers/RoutePointController";
import MediaController from "./controllers/MediaController";
import ReviewController from "./controllers/ReviewController";
import FavoriteController from "./controllers/FavoriteController";
import BookingController from "./controllers/BookingController";
import MessageController from "./controllers/MessageController";
import FollowController from "./controllers/FollowController";
import AuthController from "./controllers/AuthController";
import authMiddleware from "./middleware/auth.middleware";

const router = express.Router();

const authController = new AuthController();
const userController = new UserController();
const routeController = new RouteController();
const routePointController = new RoutePointController();
const mediaController = new MediaController();
const reviewController = new ReviewController();
const favoriteController = new FavoriteController();
const bookingController = new BookingController();
const messageController = new MessageController();
const followController = new FollowController();

// Public routes
router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

// Apply auth middleware to all following routes
router.use(authMiddleware);

// Protected routes
router.get("/users", userController.getAll.bind(userController));
router.get("/users/:id", userController.getById.bind(userController));
router.put("/users/:id", userController.update.bind(userController));
router.delete("/users/:id", userController.delete.bind(userController));

// Route routes
router.get("/routes", routeController.getAll.bind(routeController));
router.get("/routes/:id", routeController.getById.bind(routeController));
router.post("/routes", routeController.create.bind(routeController));
router.put("/routes/:id", routeController.update.bind(routeController));
router.delete("/routes/:id", routeController.delete.bind(routeController));

// RoutePoint routes
router.get("/route-points", routePointController.getAll.bind(routePointController));
router.get("/route-points/:id", routePointController.getById.bind(routePointController));
router.post("/route-points", routePointController.create.bind(routePointController));
router.put("/route-points/:id", routePointController.update.bind(routePointController));
router.delete("/route-points/:id", routePointController.delete.bind(routePointController));

// Media routes
router.get("/media", mediaController.getAll.bind(mediaController));
router.get("/media/:id", mediaController.getById.bind(mediaController));
router.post("/media", mediaController.create.bind(mediaController));
router.put("/media/:id", mediaController.update.bind(mediaController));
router.delete("/media/:id", mediaController.delete.bind(mediaController));

// Review routes
router.get("/reviews", reviewController.getAll.bind(reviewController));
router.get("/reviews/:id", reviewController.getById.bind(reviewController));
router.post("/reviews", reviewController.create.bind(reviewController));
router.put("/reviews/:id", reviewController.update.bind(reviewController));
router.delete("/reviews/:id", reviewController.delete.bind(reviewController));

// Favorite routes
router.get("/favorites", favoriteController.getAll.bind(favoriteController));
router.get("/favorites/user/:userId", favoriteController.getByUser.bind(favoriteController));
router.post("/favorites", favoriteController.create.bind(favoriteController));
router.delete("/favorites", favoriteController.delete.bind(favoriteController));

// Booking routes
router.get("/bookings", bookingController.getAll.bind(bookingController));
router.get("/bookings/user/:userId", bookingController.getByUser.bind(bookingController));
router.post("/bookings", bookingController.create.bind(bookingController));
router.put("/bookings/:id/status", bookingController.updateStatus.bind(bookingController));
router.delete("/bookings/:id", bookingController.delete.bind(bookingController));

// Message routes
router.get("/messages", messageController.getAll.bind(messageController));
router.get("/messages/conversation/:userId1/:userId2", messageController.getConversation.bind(messageController));
router.post("/messages", messageController.create.bind(messageController));
router.patch("/messages/:id/read", messageController.markAsRead.bind(messageController));

// Follow routes
router.post("/follows", followController.create.bind(followController));
router.delete("/follows", followController.delete.bind(followController));
router.get("/follows/followers/:userId", followController.getFollowers.bind(followController));
router.get("/follows/following/:userId", followController.getFollowing.bind(followController));

export default router;