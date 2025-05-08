"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PropertyController_1 = require("../controller/PropertyController");
const propertyRouter = (0, express_1.Router)();
propertyRouter.get("/property", PropertyController_1.PropertyController.all);
propertyRouter.post("/property", PropertyController_1.PropertyController.create);
propertyRouter.get("/property/:id", PropertyController_1.PropertyController.findOne);
propertyRouter.put("/property/:id", PropertyController_1.PropertyController.update);
propertyRouter.delete("/property/:id", PropertyController_1.PropertyController.delete);
exports.default = propertyRouter;
//# sourceMappingURL=PropertyRouter.js.map