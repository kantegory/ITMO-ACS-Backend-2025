import { Router } from "express";
import { UserController } from "../controllers/UserController";
import isLoggedIn from "../middlewares/isLoggedIn";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/", userController.getAllEntities);
userRouter.get("/:id", userController.getEntityById);
// router.post("/", userController.createEntity);
userRouter.put("/:id", userController.updateEntity);
userRouter.delete("/:id", userController.deleteEntity);

export default userRouter;
