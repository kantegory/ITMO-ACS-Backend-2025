import { Router } from "express";
import {
    createCountryHouse,
    getAllCountryHouses,
    getCountryHouseById,
    updateCountryHouse,
    deleteCountryHouse
} from "../controllers/CHouseController";

const countryHouseRouter = Router();

countryHouseRouter.post("/", createCountryHouse);
countryHouseRouter.get("/", getAllCountryHouses);
countryHouseRouter.get("/:id", getCountryHouseById);
countryHouseRouter.put("/:id", updateCountryHouse);
countryHouseRouter.delete("/:id", deleteCountryHouse);

export default countryHouseRouter;
