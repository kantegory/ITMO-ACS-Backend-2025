"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.PropertyImageController = void 0;
const databaseConfig_1 = require("../config/databaseConfig");
const Property_1 = require("../entities/Property");
const PropertyImage_1 = require("../entities/PropertyImage");
const BaseController_1 = require("./BaseController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.PropertyImageController = new BaseController_1.BaseController(databaseConfig_1.AppDataSource.getRepository(PropertyImage_1.PropertyImage));
const uploadDir = path_1.default.join(__dirname, '../../uploads/property-images');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
exports.upload = (0, multer_1.default)({ storage });
exports.PropertyImageController.uploadImages = [
    exports.upload.array('images', 10),
    async (req, res) => {
        try {
            const user = req.payload;
            const propertyId = req.body.propertyId;
            if (!user || user.role !== 'landlord') {
                res.status(403).json({ error: 'Only landlords can add images' });
                return;
            }
            const propertyRepo = databaseConfig_1.AppDataSource.getRepository(Property_1.Property);
            const property = await propertyRepo.findOne({
                where: { id: propertyId },
                relations: ['owner'],
            });
            if (!property) {
                res.status(404).json({ error: 'Property not found' });
                return;
            }
            if (property.owner.id !== user.userId) {
                res
                    .status(403)
                    .json({ error: 'You are not the owner of this property' });
                return;
            }
            if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
                res.status(400).json({ error: 'No images uploaded' });
                return;
            }
            const imageRepo = databaseConfig_1.AppDataSource.getRepository(PropertyImage_1.PropertyImage);
            const images = [];
            for (const file of req.files) {
                const image = imageRepo.create({
                    property,
                    url: `/uploads/property-images/${file.filename}`,
                });
                await imageRepo.save(image);
                images.push(image);
            }
            res.status(201).json(images);
        }
        catch (error) {
            console.error('Error in uploadImages:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
];
exports.PropertyImageController.getAll = async (req, res) => {
    try {
        const propertyId = req.query.propertyId;
        if (!propertyId) {
            res.status(400).json({ error: 'propertyId query parameter is required' });
            return;
        }
        const imageRepo = databaseConfig_1.AppDataSource.getRepository(PropertyImage_1.PropertyImage);
        const images = await imageRepo.find({
            where: { property: { id: Number(propertyId) } },
            relations: ['property'],
        });
        res.status(200).json(images);
    }
    catch (error) {
        console.error('Error in getAll images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
