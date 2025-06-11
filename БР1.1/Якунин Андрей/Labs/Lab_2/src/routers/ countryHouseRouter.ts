import { Router } from "express";
import CountryHouseController from "../controllers/CountryHouseController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, CountryHouseController.createCountryHouse);
router.get("/", CountryHouseController.getAllCountryHouses);
router.get("/:id", CountryHouseController.getCountryHouseById);
router.put("/:id", auth, CountryHouseController.updateCountryHouse);
router.delete("/:id", auth, CountryHouseController.deleteCountryHouse);

export default router;
