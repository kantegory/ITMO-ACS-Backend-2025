"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apartmentController_1 = require("../controllers/apartmentController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get("/", apartmentController_1.getAllApartments);
router.get("/:id", apartmentController_1.getApartmentById);
// Protected routes
router.post("/", auth_1.authMiddleware, apartmentController_1.createApartment);
router.put("/:id", auth_1.authMiddleware, apartmentController_1.updateApartment);
router.delete("/:id", auth_1.authMiddleware, apartmentController_1.deleteApartment);
exports.default = router;
//# sourceMappingURL=apartments.js.map