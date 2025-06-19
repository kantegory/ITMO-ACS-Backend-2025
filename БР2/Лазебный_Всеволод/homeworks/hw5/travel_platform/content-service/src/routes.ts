import express from "express";
import RouteController from "./controllers/RouteController";
import RoutePointController from "./controllers/RoutePointController";
import ReviewController from "./controllers/ReviewController";
import FavoriteController from "./controllers/FavoriteController";
import BookingController from "./controllers/BookingController";
import authMiddleware from "./middleware/auth.middleware";

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *
 *   parameters:
 *     userIdParam:
 *       in: path
 *       name: userId
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID пользователя
 *
 *     routeIdParam:
 *       in: path
 *       name: routeId
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID маршрута
 */
const router = express.Router();

const routeController = new RouteController();
const routePointController = new RoutePointController();
const reviewController = new ReviewController();
const favoriteController = new FavoriteController();
const bookingController = new BookingController();

// Apply auth middleware to all following routes
router.use(authMiddleware);

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

export default router;