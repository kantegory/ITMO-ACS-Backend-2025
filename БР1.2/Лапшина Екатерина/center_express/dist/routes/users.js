"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Public routes
router.get("/", userController_1.getAllUsers);
router.get("/agents", userController_1.getAgents);
router.get("/clients", userController_1.getClients);
router.get("/:id", userController_1.getUserById);
// Protected routes
router.post("/", auth_1.authMiddleware, userController_1.createUser);
router.put("/:id", auth_1.authMiddleware, userController_1.updateUser);
router.delete("/:id", auth_1.authMiddleware, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map