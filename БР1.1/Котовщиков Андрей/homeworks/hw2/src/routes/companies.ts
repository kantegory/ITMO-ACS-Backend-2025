import express from "express"
import * as api from "../controllers/companies"

export const companyRouter = express.Router()

companyRouter.get("/", api.getAllCompanies)
companyRouter.get("/:id", api.getCompanyById)
companyRouter.post("/", api.createCompany)
companyRouter.put("/:id", api.updateCompany)
companyRouter.delete("/:id", api.deleteCompanyById)
