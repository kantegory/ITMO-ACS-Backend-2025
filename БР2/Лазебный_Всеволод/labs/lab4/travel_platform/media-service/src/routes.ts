import express from "express";
import MediaController from "./controllers/MediaController";
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

const mediaController = new MediaController();

// Apply auth middleware to all following routes
router.use(authMiddleware);


// Media routes
router.get("/media", mediaController.getAll.bind(mediaController));
router.get("/media/:id", mediaController.getById.bind(mediaController));
router.post("/media", mediaController.create.bind(mediaController));
router.put("/media/:id", mediaController.update.bind(mediaController));
router.delete("/media/:id", mediaController.delete.bind(mediaController));

export default router;