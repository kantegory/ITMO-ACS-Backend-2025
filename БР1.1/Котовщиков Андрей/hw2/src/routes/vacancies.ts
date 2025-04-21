import express from "express"
import * as api from "../controllers/vacancies"

export const vacancyRouter = express.Router()

vacancyRouter.get("/", api.getAllVacancies)
vacancyRouter.get("/:id", api.getVacancyById)
vacancyRouter.post("/", api.createVacancy)
vacancyRouter.put("/:id", api.updateVacancy)
vacancyRouter.delete("/:id", api.deleteVacancyById)
