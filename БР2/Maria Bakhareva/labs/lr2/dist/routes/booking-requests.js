"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BookingRequestController_1 = require("../controllers/BookingRequestController");
const checkJwt_1 = require("../middleware/checkJwt");
const User_1 = require("../entities/User");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Booking Requests
 *   description: Endpoints for managing booking requests
 */
/**
 * @swagger
 * /api/booking-requests:
 *   get:
 *     summary: Get all booking requests
 *     tags: [Booking Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of booking requests
 */
router.get('/', checkJwt_1.checkJwt, BookingRequestController_1.BookingRequestController.getAll);
/**
 * @swagger
 * /api/booking-requests/{id}:
 *   get:
 *     summary: Get booking request by ID
 *     tags: [Booking Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Booking request ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking request found
 *       404:
 *         description: Booking request not found
 */
router.get('/:id', checkJwt_1.checkJwt, BookingRequestController_1.BookingRequestController.getById);
/**
 * @swagger
 * /api/booking-requests:
 *   post:
 *     summary: Create a new booking request
 *     tags: [Booking Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - propertyId
 *               - requestedStartDate
 *               - requestedEndDate
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 minimum: 1
 *               requestedStartDate:
 *                 type: string
 *                 format: date
 *               requestedEndDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 description: Optional status (e.g., 'pending', 'approved')
 *     responses:
 *       201:
 *         description: Booking request created
 *       400:
 *         description: Validation error
 */
router.post('/', checkJwt_1.checkJwt, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), BookingRequestController_1.BookingRequestController.create);
/**
 * @swagger
 * /api/booking-requests/{id}:
 *   put:
 *     summary: Update a booking request
 *     tags: [Booking Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Booking request ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requestedStartDate:
 *                 type: string
 *                 format: date
 *               requestedEndDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking request updated
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('booking_request', 'tenant'), BookingRequestController_1.BookingRequestController.update);
/**
 * @swagger
 * /api/booking-requests/{id}:
 *   delete:
 *     summary: Delete a booking request
 *     tags: [Booking Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Booking request ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Booking request deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('booking_request', 'tenant'), BookingRequestController_1.BookingRequestController.delete);
exports.default = router;
