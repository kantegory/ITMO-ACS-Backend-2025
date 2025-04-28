"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userMeasurementsProgressController_1 = require("../controllers/userMeasurementsProgressController");
const router = express_1.default.Router();
router.post('/measurements', userMeasurementsProgressController_1.createMeasurement);
router.get('/measurements/:id', userMeasurementsProgressController_1.getMeasurement);
router.put('/measurements/:id', userMeasurementsProgressController_1.updateMeasurement);
router.delete('/measurements/:id', userMeasurementsProgressController_1.deleteMeasurement);
router.get('/measurements', userMeasurementsProgressController_1.listMeasurements);
exports.default = router;
