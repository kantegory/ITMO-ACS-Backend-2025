"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userWorkoutProgressController_1 = require("../controllers/userWorkoutProgressController");
const router = express_1.default.Router();
router.post('/progress', userWorkoutProgressController_1.createProgress);
router.get('/progress/:id', userWorkoutProgressController_1.getProgress);
router.put('/progress/:id', userWorkoutProgressController_1.updateProgress);
router.delete('/progress/:id', userWorkoutProgressController_1.deleteProgress);
router.get('/progress', userWorkoutProgressController_1.listProgress);
exports.default = router;
