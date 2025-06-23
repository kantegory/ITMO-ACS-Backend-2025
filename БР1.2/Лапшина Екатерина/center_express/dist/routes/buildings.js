"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buildingController_1 = require("../controllers/buildingController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get("/", buildingController_1.getAllBuildings);
router.get("/:id", buildingController_1.getBuildingById);
// Protected routes
router.post("/", auth_1.authMiddleware, buildingController_1.createBuilding);
router.put("/:id", auth_1.authMiddleware, buildingController_1.updateBuilding);
router.delete("/:id", auth_1.authMiddleware, buildingController_1.deleteBuilding);
exports.default = router;
//# sourceMappingURL=buildings.js.map