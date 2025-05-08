import { Router } from "express";
import { ReviewController } from "../controller/ReviewController";

const reviewRouter = Router();
reviewRouter.get("/reviews", ReviewController.all);
reviewRouter.post("/reviews", ReviewController.create);
reviewRouter.get("/reviews/:id", ReviewController.findOne);
reviewRouter.put("/reviews/:id", ReviewController.update);
reviewRouter.delete("/reviews/:id", ReviewController.delete);

export default reviewRouter;