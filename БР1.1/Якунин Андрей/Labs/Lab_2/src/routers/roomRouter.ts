import { Router } from "express";
import RoomController from "../controllers/roomController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", RoomController.getAllRooms);
router.get("/:id", RoomController.getRoomById);
router.post("/", auth, RoomController.createRoom);
router.put("/:id",auth, RoomController.updateRoom);
router.delete("/:id",auth, RoomController.deleteRoom);

export default router;
