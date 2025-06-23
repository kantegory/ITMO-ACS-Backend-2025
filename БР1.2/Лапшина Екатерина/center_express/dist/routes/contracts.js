"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contractController_1 = require("../controllers/contractController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get("/", contractController_1.getAllContracts);
router.get("/:id", contractController_1.getContractById);
// Protected routes
router.post("/", auth_1.authMiddleware, contractController_1.createContract);
router.put("/:id", auth_1.authMiddleware, contractController_1.updateContract);
router.delete("/:id", auth_1.authMiddleware, contractController_1.deleteContract);
exports.default = router;
//# sourceMappingURL=contracts.js.map