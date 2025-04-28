"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutPlanController_1 = require("../controllers/workoutPlanController");
const router = express_1.default.Router();
router.post('/plans', workoutPlanController_1.createPlan);
router.get('/plans/:id', workoutPlanController_1.getPlan);
router.put('/plans/:id', workoutPlanController_1.updatePlan);
router.delete('/plans/:id', workoutPlanController_1.deletePlan);
router.get('/plans', workoutPlanController_1.listPlans);
exports.default = router;
