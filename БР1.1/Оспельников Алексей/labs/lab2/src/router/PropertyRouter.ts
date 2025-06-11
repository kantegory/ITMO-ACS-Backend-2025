import { Router } from "express";
import { PropertyController } from "../controller/PropertyController";

const propertyRouter = Router();
propertyRouter.get("/property", PropertyController.all);
propertyRouter.post("/property", PropertyController.create);
propertyRouter.get("/property/:id", PropertyController.findOne);
propertyRouter.put("/property/:id", PropertyController.update);
propertyRouter.delete("/property/:id", PropertyController.delete);

export default propertyRouter;