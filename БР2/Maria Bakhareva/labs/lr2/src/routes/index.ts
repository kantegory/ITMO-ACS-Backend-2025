import { Router } from 'express';
import userRoutes from './userRoutes';
import propertyRoutes from './properties';
import rentalRoutes from './rentals';
import chatRoutes from './chats';
import favoriteRoutes from './favorites';
import bookingRequestRoutes from './booking-requests';
import reviewRoutes from './reviewRoutes';
import complaintRoutes from './complaints';
import propertyImageRoutes from './property-images';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Main
 *   description: Main API routes for the application
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: User-related operations
 *     tags: [Main]
 *     description: This endpoint handles user-related actions (login, register, etc.)
 *     responses:
 *       200:
 *         description: Successfully returned user routes
 */

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Property-related operations
 *     tags: [Main]
 *     description: This endpoint handles property-related actions (create, update, get, delete)
 *     responses:
 *       200:
 *         description: Successfully returned property routes
 */

/**
 * @swagger
 * /api/rentals:
 *   get:
 *     summary: Rental-related operations
 *     tags: [Main]
 *     description: This endpoint handles rental-related actions (get rentals, manage bookings)
 *     responses:
 *       200:
 *         description: Successfully returned rental routes
 */

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Chat-related operations
 *     tags: [Main]
 *     description: This endpoint handles chat operations between users
 *     responses:
 *       200:
 *         description: Successfully returned chat routes
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Favorite-related operations
 *     tags: [Main]
 *     description: This endpoint handles actions related to favorites (add, remove)
 *     responses:
 *       200:
 *         description: Successfully returned favorite routes
 */

/**
 * @swagger
 * /api/booking-requests:
 *   get:
 *     summary: Booking request-related operations
 *     tags: [Main]
 *     description: This endpoint handles booking request actions
 *     responses:
 *       200:
 *         description: Successfully returned booking request routes
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Review-related operations
 *     tags: [Main]
 *     description: This endpoint handles review actions (create, update, get reviews)
 *     responses:
 *       200:
 *         description: Successfully returned review routes
 */

/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Complaint-related operations
 *     tags: [Main]
 *     description: This endpoint handles complaint actions (file a complaint, resolve)
 *     responses:
 *       200:
 *         description: Successfully returned complaint routes
 */

/**
 * @swagger
 * /api/property-images:
 *   get:
 *     summary: Property image-related operations
 *     tags: [Main]
 *     description: This endpoint handles property image upload and retrieval
 *     responses:
 *       200:
 *         description: Successfully returned property image routes
 */

router.use('/users', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/rentals', rentalRoutes);
router.use('/chats', chatRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/reviews', reviewRoutes);
router.use('/complaints', complaintRoutes);
router.use('/property-images', propertyImageRoutes);

export default router;
