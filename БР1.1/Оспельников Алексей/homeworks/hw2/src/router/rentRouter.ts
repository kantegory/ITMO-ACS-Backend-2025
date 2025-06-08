import { Router } from "express";
import { RentController } from "../controller/RentController";

const rentRouter = Router();
rentRouter.get("/rents", RentController.all);
rentRouter.post("/rents", RentController.create);
rentRouter.get("/rents/:id", RentController.findOne);
rentRouter.put("/rents/:id", RentController.update);
rentRouter.delete("/rents/:id", RentController.delete);

export default rentRouter;