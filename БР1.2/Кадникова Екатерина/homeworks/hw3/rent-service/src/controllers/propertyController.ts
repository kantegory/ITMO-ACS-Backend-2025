/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management
 *
 * components:
 *   schemas:
 *     PropertyBase:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Cozy apartment in downtown"
 *         description:
 *           type: string
 *           example: "Beautiful 2-bedroom apartment with great view"
 *         rental_type:
 *           type: string
 *           enum: [daily, monthly]
 *           example: "monthly"
 *         price:
 *           type: number
 *           format: float
 *           example: 1200.50
 *         location:
 *           type: string
 *           example: "New York, NY"
 *         property_type:
 *           type: string
 *           enum: [apartment, house, room, studio, storage, office]
 *           example: "apartment"
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     PropertyCreate:
 *       type: object
 *       required:
 *         - ownerId
 *         - title
 *         - rental_type
 *         - price
 *         - location
 *         - property_type
 *       properties:
 *         ownerId:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           example: "Cozy apartment in downtown"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Beautiful 2-bedroom apartment with great view"
 *         rental_type:
 *           type: string
 *           enum: [daily, monthly]
 *           example: "monthly"
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 1200.50
 *         location:
 *           type: string
 *           minLength: 5
 *           example: "New York, NY"
 *         property_type:
 *           type: string
 *           enum: [apartment, house, room, studio, storage, office]
 *           example: "apartment"
 *
 *     PropertyUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           example: "Updated title"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Updated description"
 *         rental_type:
 *           type: string
 *           enum: [daily, monthly]
 *           example: "daily"
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           example: 1000.00
 *         location:
 *           type: string
 *           minLength: 5
 *           example: "Updated location"
 *         property_type:
 *           type: string
 *           enum: [apartment, house, room, studio, storage, office]
 *           example: "house"
 *
 *     PropertyWithOwner:
 *       allOf:
 *         - $ref: '#/components/schemas/PropertyBase'
 *         - type: object
 *           properties:
 *             owner:
 *               $ref: '#/components/schemas/UserBase'
 */

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Property } from "../models/Property";
import { User } from "../models/User";

const propertyRepo = AppDataSource.getRepository(Property);
const userRepo = AppDataSource.getRepository(User);

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyCreate'
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyWithOwner'
 *       404:
 *         description: Owner not found
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
export const createProperty = async (req: Request, res: Response) => {
    try {
        const {
            ownerId,
            title,
            description,
            rental_type,
            price,
            location,
            property_type,
        } = req.body;

        const owner = await userRepo.findOneBy({ id: ownerId });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const property = propertyRepo.create({
            owner,
            title,
            description,
            rental_type,
            price,
            location,
            property_type,
        });

        await propertyRepo.save(property);
        res.status(201).json(property);
    } catch (err) {
        res.status(500).json({ message: "Error creating property", error: err });
    }
};

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: List of all properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyWithOwner'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getAllProperties = async (_req: Request, res: Response) => {
    try {
        const properties = await propertyRepo.find({ relations: ["owner"] });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ message: "Error fetching properties", error: err });
    }
};

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyWithOwner'
 *       404:
 *         description: Property not found
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
export const getPropertyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const property = await propertyRepo.findOne({
            where: { id: parseInt(id) },
            relations: ["owner"],
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.json(property);
    } catch (err) {
        res.status(500).json({ message: "Error fetching property", error: err });
    }
};

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property information
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyUpdate'
 *     responses:
 *       200:
 *         description: Updated property data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PropertyWithOwner'
 *       404:
 *         description: Property not found
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
export const updateProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const property = await propertyRepo.findOneBy({ id: parseInt(id) });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        propertyRepo.merge(property, data);
        await propertyRepo.save(property);
        res.json(property);
    } catch (err) {
        res.status(500).json({ message: "Error updating property", error: err });
    }
};

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Property deleted"
 *       404:
 *         description: Property not found
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
export const deleteProperty = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const property = await propertyRepo.findOneBy({ id: parseInt(id) });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await propertyRepo.remove(property);
        res.json({ message: "Property deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting property", error: err });
    }
};