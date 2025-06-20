import express from "express"
import { UserController } from "./controllers/user.controller"
import { EmployeeCabinetController } from "./controllers/employee-cabinet.controller"
import { EmployerCabinetController } from "./controllers/employer-cabinet.controller"
import { ResumeController } from "./controllers/resume.controller"
import { SkillController } from "./controllers/skill.controller"
import { JobOfferController } from "./controllers/job-offer.controller"
import { JobCategoryController } from "./controllers/job-category.controller"
import { CompanyController } from "./controllers/company.controller"
import { myDataSource } from "./app-data-source"

const app = express()
app.use(express.json())

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const userController = new UserController()
const employeeCabinetController = new EmployeeCabinetController()
const employerCabinetController = new EmployerCabinetController()
const resumeController = new ResumeController()
const skillController = new SkillController()
const jobOfferController = new JobOfferController()
const jobCategoryController = new JobCategoryController()
const companyController = new CompanyController()

app.get("/users", function(req, res) { userController.getAll(req, res) })
app.get("/get-user-by-email/:email", function(req, res) { userController.getByEmail(req, res) })
app.get("/users/:id", function(req, res) { userController.getById(req, res) })
app.post("/users", function(req, res) { userController.create(req, res) })
app.put("/users/:id", function(req, res) { userController.update(req, res) })
app.delete("/users/:id", function(req, res) { userController.delete(req, res) })

app.get("/employee-cabinets", function(req, res) { employeeCabinetController.getAll(req, res) })
app.get("/employee-cabinets/user/:userId", function(req, res) { employeeCabinetController.getByUserId(req, res) })
app.get("/employee-cabinets/:id", function(req, res) { employeeCabinetController.getById(req, res) })
app.post("/employee-cabinets", function(req, res) { employeeCabinetController.create(req, res) })
app.patch("/employee-cabinets/:id", function(req, res) { employeeCabinetController.update(req, res) })
app.delete("/employee-cabinets/:id", function(req, res) { employeeCabinetController.delete(req, res) })

app.get("/employer-cabinets", function(req, res) { employerCabinetController.getAll(req, res) })
app.get("/employer-cabinets/user/:userId", function(req, res) { employerCabinetController.getByUserId(req, res) })
app.get("/employer-cabinets/:id", function(req, res) { employerCabinetController.getById(req, res) })
app.post("/employer-cabinets", function(req, res) { employerCabinetController.create(req, res) })
app.patch("/employer-cabinets/:id", function(req, res) { employerCabinetController.update(req, res) })
app.delete("/employer-cabinets/:id", function(req, res) { employerCabinetController.delete(req, res) })

app.get("/resumes", function(req, res) { resumeController.getAll(req, res) })
app.get("/resumes/employee/:employeeId", function(req, res) { resumeController.getByEmployeeId(req, res) })
app.get("/resumes/:id", function(req, res) { resumeController.getById(req, res) })
app.post("/resumes", function(req, res) { resumeController.create(req, res) })
app.patch("/resumes/:id", function(req, res) { resumeController.update(req, res) })
app.delete("/resumes/:id", function(req, res) { resumeController.delete(req, res) })

app.get("/skills", function(req, res) { skillController.getAll(req, res) })
app.get("/skills/:id", function(req, res) { skillController.getById(req, res) })
app.post("/skills", function(req, res) { skillController.create(req, res) })
app.put("/skills/:id", function(req, res) { skillController.update(req, res) })
app.delete("/skills/:id", function(req, res) { skillController.delete(req, res) })

app.get("/job-offers", function(req, res) { jobOfferController.getAll(req, res) })
app.get("/job-offers/company/:companyId", function(req, res) { jobOfferController.getByCompanyId(req, res) })
app.get("/job-offers/category/:categoryId", function(req, res) { jobOfferController.getByCategoryId(req, res) })
app.get("/job-offers/:id", function(req, res) { jobOfferController.getById(req, res) })
app.post("/job-offers", function(req, res) { jobOfferController.create(req, res) })
app.put("/job-offers/:id", function(req, res) { jobOfferController.update(req, res) })
app.delete("/job-offers/:id", function(req, res) { jobOfferController.delete(req, res) })

app.get("/job-categories", function(req, res) { jobCategoryController.getAll(req, res) })
app.get("/job-categories/:id", function(req, res) { jobCategoryController.getById(req, res) })
app.post("/job-categories", function(req, res) { jobCategoryController.create(req, res) })
app.put("/job-categories/:id", function(req, res) { jobCategoryController.update(req, res) })
app.delete("/job-categories/:id", function(req, res) { jobCategoryController.delete(req, res) })

app.get("/companies", function(req, res) { companyController.getAll(req, res) })
app.get("/companies/employer/:employerId", function(req, res) { companyController.getByEmployerId(req, res) })
app.get("/companies/:id", function(req, res) { companyController.getById(req, res) })
app.post("/companies", function(req, res) { companyController.create(req, res) })
app.put("/companies/:id", function(req, res) { companyController.update(req, res) })
app.delete("/companies/:id", function(req, res) { companyController.delete(req, res) })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})