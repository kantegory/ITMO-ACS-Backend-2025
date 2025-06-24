import { Router } from "express";
import {
    createUserDetails,
    getAllUserDetails,
    getUserDetailsById,
    updateUserDetails,
    deleteUserDetails
  } from "../controllers/UserDetailsController";
  
const router = Router();

router.post("/", createUserDetails);
router.get("/", getAllUserDetails);
router.get("/:id", getUserDetailsById);
router.put("/:id", updateUserDetails);
router.delete("/:id", deleteUserDetails);

export default router;