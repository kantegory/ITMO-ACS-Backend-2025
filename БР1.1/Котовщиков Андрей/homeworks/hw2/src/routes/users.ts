import express from "express"
import * as api from "../controllers/users"

export const userRouter = express.Router()

userRouter.get("/:id", api.getUserById)
userRouter.get("/search", api.getUserByEmail)
userRouter.post("/", api.createUser)
userRouter.put("/:id", api.updateUser)
userRouter.delete("/:id", api.deleteUserById)
