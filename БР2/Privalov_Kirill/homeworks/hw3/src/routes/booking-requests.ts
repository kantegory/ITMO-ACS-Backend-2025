import { Router } from 'express';
import { BookingRequestController } from '../controllers/BookingRequestController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { UserRole } from '../entities/User';

const router = Router();

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
router.get('/', checkJwt, BookingRequestController.getAll);

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
router.get('/:id', checkJwt, BookingRequestController.getById);

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
router.post(
  '/',
  checkJwt,
  checkRole(UserRole.TENANT),
  BookingRequestController.create,
);

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
router.put(
  '/:id',
  checkJwt,
  checkOwnership('booking_request', 'tenant'),
  BookingRequestController.update,
);

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
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('booking_request', 'tenant'),
  BookingRequestController.delete,
);

export default router;
