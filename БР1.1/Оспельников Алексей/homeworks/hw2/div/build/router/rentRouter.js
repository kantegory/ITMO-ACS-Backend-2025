"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RentController_1 = require("../controller/RentController");
const rentRouter = (0, express_1.Router)();
rentRouter.get("/rents", RentController_1.RentController.all);
rentRouter.post("/rents", RentController_1.RentController.create);
rentRouter.get("/rents/:id", RentController_1.RentController.findOne);
rentRouter.put("/rents/:id", RentController_1.RentController.update);
rentRouter.delete("/rents/:id", RentController_1.RentController.delete);
exports.default = rentRouter;
//# sourceMappingURL=rentRouter.js.map