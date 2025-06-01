import { Router } from 'express';
import { ComplaintController } from '../controllers/ComplaintController';
import { checkJwt, checkOwnership, checkRole } from '../middleware/checkJwt';
import { validatorComplaint } from '../middleware/validator/validatorComplaint';
import { UserRole } from '../entities/UserRole';

const router = Router();
const complaintController = new ComplaintController();

/**
 * @swagger
 * tags:
 *   name: Complaints
 *   description: Complaint management endpoints
 */

/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get all complaints
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of complaints
 */
router.get('/', checkJwt, complaintController.getAll);

/**
 * @swagger
 * /api/complaints/{id}:
 *   get:
 *     summary: Get complaint by ID
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint found
 *       404:
 *         description: Complaint not found
 */
router.get('/:id', checkJwt, complaintController.getById);

/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create a new complaint
 *     tags: [Complaints]
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
 *               - message
 *             properties:
 *               propertyId:
 *                 type: integer
 *                 minimum: 1
 *               message:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       201:
 *         description: Complaint created
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  checkJwt,
  validatorComplaint,
  checkRole(UserRole.TENANT),
  complaintController.create,
);

/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update a complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: Complaint updated
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Complaint not found
 */
router.put(
  '/:id',
  checkJwt,
  checkOwnership('complaint', 'user'),
  complaintController.update,
);

/**
 * @swagger
 * /api/complaints/{id}:
 *   delete:
 *     summary: Delete a complaint
 *     tags: [Complaints]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Complaint ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Complaint deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Complaint not found
 */
router.delete(
  '/:id',
  checkJwt,
  checkOwnership('complaint', 'user'),
  complaintController.delete,
);

export default router;
