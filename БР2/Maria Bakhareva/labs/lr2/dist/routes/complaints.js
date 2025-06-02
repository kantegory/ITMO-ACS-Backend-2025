"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComplaintController_1 = require("../controllers/ComplaintController");
const checkJwt_1 = require("../middleware/checkJwt");
const User_1 = require("../entities/User");
const validatorComplaint_1 = require("../middleware/validator/validatorComplaint");
const router = (0, express_1.Router)();
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
router.get('/', checkJwt_1.checkJwt, ComplaintController_1.ComplaintController.getAll);
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
router.get('/:id', checkJwt_1.checkJwt, ComplaintController_1.ComplaintController.getById);
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
router.post('/', checkJwt_1.checkJwt, validatorComplaint_1.validatorComplaint, (0, checkJwt_1.checkRole)(User_1.UserRole.TENANT), ComplaintController_1.ComplaintController.create);
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
router.put('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('complaint', 'user'), ComplaintController_1.ComplaintController.update);
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
router.delete('/:id', checkJwt_1.checkJwt, (0, checkJwt_1.checkOwnership)('complaint', 'user'), ComplaintController_1.ComplaintController.delete);
exports.default = router;
