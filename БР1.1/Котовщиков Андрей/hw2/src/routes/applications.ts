import express from "express"
import * as api from "../controllers/applications"

export const applicationRouter = express.Router()

applicationRouter.get("/", api.getAllApplications)
applicationRouter.get("/:id", api.getApplicationById)
applicationRouter.post("/", api.createApplication)
applicationRouter.put("/:id", api.updateApplication)
applicationRouter.delete("/:id", api.deleteApplicationById)
