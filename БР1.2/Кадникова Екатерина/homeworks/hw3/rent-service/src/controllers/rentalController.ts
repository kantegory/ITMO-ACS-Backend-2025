/**
 * @swagger
 * tags:
 *   name: Rentals
 *   description: Property rental management
 *
 * components:
 *   schemas:
 *     RentalBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: Rental start date
 *         ended_at:
 *           type: string
 *           format: date-time
 *           description: Rental end date
 *         status:
 *           $ref: '#/components/schemas/RentalStatus'
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Rental record creation date
 *
 *     RentalWithRelations:
 *       allOf:
 *         - $ref: '#/components/schemas/RentalBase'
 *         - type: object
 *           properties:
 *             property:
 *               $ref: '#/components/schemas/Property'
 *             tenant:
 *               $ref: '#/components/schemas/User'
 *
 *     RentalCreate:
 *       type: object
 *       required:
 *         - property_id
 *         - tenant_id
 *         - started_at
 *         - ended_at
 *       properties:
 *         property_id:
 *           type: integer
 *           example: 1
 *         tenant_id:
 *           type: integer
 *           example: 2
 *         started_at:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         ended_at:
 *           type: string
 *           format: date-time
 *           example: "2023-12-31T00:00:00Z"
 *         status:
 *           $ref: '#/components/schemas/RentalStatus'
 *
 *     RentalStatusUpdate:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           $ref: '#/components/schemas/RentalStatus'
 *
 *     RentalResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Rental deleted"
 */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Rental } from "../models/Rental";
import { User } from "../models/User";
import { Property } from "../models/Property";

const rentalRepo = AppDataSource.getRepository(Rental);
const userRepo = AppDataSource.getRepository(User);
const propertyRepo = AppDataSource.getRepository(Property);

/**
 * @swagger
 * /rentals:
 *   post:
 *     summary: Create a new rental agreement
 *     tags: [Rentals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentalCreate'
 *     responses:
 *       201:
 *         description: Rental created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentalWithRelations'
 *       404:
 *         description: Property or tenant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const createRental = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { property_id, tenant_id, started_at, ended_at, status } = req.body;

        const property = await propertyRepo.findOneBy({ id: property_id });
        const tenant = await userRepo.findOneBy({ id: tenant_id });

        if (!property || !tenant) {
            return res.status(404).json({ message: "Property or tenant not found" });
        }

        const rental = rentalRepo.create({
            property,
            tenant,
            started_at,
            ended_at,
            status: status || "active",
        });

        await rentalRepo.save(rental);
        return res.status(201).json(rental);
    } catch (err) {
        console.error("Error creating rental:", err);
        return res.status(500).json({ message: "Error creating rental", error: err });
    }
};

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Get all rental agreements
 *     tags: [Rentals]
 *     responses:
 *       200:
 *         description: List of all rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentalWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllRentals = async (_req: Request, res: Response) => {
    try {
        const rentals = await rentalRepo.find({ relations: ["property", "tenant"] });
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals", error: err });
    }
};

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Get rental by ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Rental data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentalWithRelations'
 *       404:
 *         description: Rental not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getRentalById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rental = await rentalRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["property", "tenant"],
        });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        res.json(rental);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rental", error: err });
    }
};

/**
 * @swagger
 * /rentals/tenant/{tenantId}:
 *   get:
 *     summary: Get rentals by tenant ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: tenantId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Tenant ID
 *     responses:
 *       200:
 *         description: List of tenant's rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentalWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getRentalsByTenant = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.params;
        const rentals = await rentalRepo.find({
            where: { tenant: { id: parseInt(tenantId) } },
            relations: ["property", "tenant"],
        });

        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals for tenant", error: err });
    }
};

/**
 * @swagger
 * /rentals/property/{propertyId}:
 *   get:
 *     summary: Get rentals by property ID
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: List of property's rentals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RentalWithRelations'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getRentalsByProperty = async (req: Request, res: Response) => {
    try {
        const { propertyId } = req.params;
        const rentals = await rentalRepo.find({
            where: { property: { id: parseInt(propertyId) } },
            relations: ["property", "tenant"],
        });

        res.json(rentals);
    } catch (err) {
        res.status(500).json({ message: "Error fetching rentals for property", error: err });
    }
};

/**
 * @swagger
 * /rentals/{id}:
 *   delete:
 *     summary: Delete a rental agreement
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rental ID
 *     responses:
 *       200:
 *         description: Rental deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentalResponse'
 *       404:
 *         description: Rental not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const deleteRental = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const rental = await rentalRepo.findOneBy({ id: parseInt(id) });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        await rentalRepo.remove(rental);
        res.json({ message: "Rental deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting rental", error: err });
    }
};

/**
 * @swagger
 * /rentals/{id}/status:
 *   put:
 *     summary: Update rental status
 *     tags: [Rentals]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Rental ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RentalStatusUpdate'
 *     responses:
 *       200:
 *         description: Rental status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RentalWithRelations'
 *       404:
 *         description: Rental not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const updateRentalStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const rental = await rentalRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["property", "tenant"],
        });

        if (!rental) {
            return res.status(404).json({ message: "Rental not found" });
        }

        rental.status = status;

        const updatedRental = await rentalRepo.save(rental);
        res.json(updatedRental);
    } catch (err) {
        res.status(500).json({ message: "Error updating rental", error: err });
    }
};