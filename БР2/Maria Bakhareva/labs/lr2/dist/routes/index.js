"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const properties_1 = __importDefault(require("./properties"));
const rentals_1 = __importDefault(require("./rentals"));
const chats_1 = __importDefault(require("./chats"));
const favorites_1 = __importDefault(require("./favorites"));
const booking_requests_1 = __importDefault(require("./booking-requests"));
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const complaints_1 = __importDefault(require("./complaints"));
const property_images_1 = __importDefault(require("./property-images"));
const router = (0, express_1.Router)();
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
router.use('/users', userRoutes_1.default);
router.use('/properties', properties_1.default);
router.use('/rentals', rentals_1.default);
router.use('/chats', chats_1.default);
router.use('/favorites', favorites_1.default);
router.use('/booking-requests', booking_requests_1.default);
router.use('/reviews', reviewRoutes_1.default);
router.use('/complaints', complaints_1.default);
router.use('/property-images', property_images_1.default);
exports.default = router;
