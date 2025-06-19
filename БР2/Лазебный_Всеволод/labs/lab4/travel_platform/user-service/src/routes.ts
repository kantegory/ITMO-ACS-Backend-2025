import express from "express";
import UserController from "./controllers/UserController";
import FollowController from "./controllers/FollowController";
import MessageController from "./controllers/MessageController";
import AuthController from "./controllers/AuthController";
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

const userController = new UserController();
const followController = new FollowController();
const messageController = new MessageController();
const authController = new AuthController();

// Public routes
router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));

// Protected routes
router.use(authMiddleware);
router.get("/users", userController.getAll.bind(userController));
router.get("/users/:id", userController.getById.bind(userController));
router.put("/users/:id", userController.update.bind(userController));
router.delete("/users/:id", userController.delete.bind(userController));

router.post("/follows", followController.create.bind(followController));
router.delete("/follows", followController.delete.bind(followController));
router.get("/follows/followers/:userId", followController.getFollowers.bind(followController));
router.get("/follows/following/:userId", followController.getFollowing.bind(followController));

router.get("/messages", messageController.getAll.bind(messageController));
router.get("/messages/conversation/:userId1/:userId2", messageController.getConversation.bind(messageController));
router.post("/messages", messageController.create.bind(messageController));
router.patch("/messages/:id/read", messageController.markAsRead.bind(messageController));

// Token validation endpoint for other services
router.post("/validate-token", authMiddleware, (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;