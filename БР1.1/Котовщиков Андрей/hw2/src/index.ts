import "reflect-metadata"

import express from "express"
import { dataSource } from "./models/database"
import { userRouter } from "./routes/users"
import { companyRouter } from "./routes/companies"
import { resumeRouter } from "./routes/resumes"
import { vacancyRouter } from "./routes/vacancies"
import { applicationRouter } from "./routes/applications"

dataSource
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!")
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err)
	})

const app = express()
app.use(express.json())

app.use("/users", userRouter)
app.use("/companies", companyRouter)
app.use("/resumes", resumeRouter)
app.use("/vacancies", vacancyRouter)
app.use("/applications", applicationRouter)

app.listen(3000, () => {
	console.log("Server started on port 3000!")
})
