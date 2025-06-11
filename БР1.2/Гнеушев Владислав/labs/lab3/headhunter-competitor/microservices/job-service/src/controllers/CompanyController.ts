import { Repository } from "typeorm"
import { Company } from "../models/Company"
import { jobDataSource } from "../config/data-source"
import { CreateCompanyDto, UpdateCompanyDto } from "../dto/CompanyDto"
import { HttpError } from "../errors/HttpError"
import { UserService } from "../services/UserService"

export class CompanyController {
    private repository: Repository<Company>
    private userService: UserService

    constructor() {
        this.repository = jobDataSource.getRepository(Company)
        this.userService = new UserService()
    }

    async getAll(): Promise<Company[]> {
        try {
            const items = await this.repository.find({
                relations: ['jobOffers']
            })
            return items
        } catch (error) {
            throw new HttpError(500, "Error fetching companies")
        }
    }

    async getById(id: string): Promise<Company> {
        try {
            const companyId = parseInt(id)
            if (isNaN(companyId)) {
                throw new HttpError(400, "Invalid company ID format")
            }
            const item = await this.repository.findOne({
                where: { id: companyId },
                relations: ['jobOffers']
            })
            if (!item) {
                throw new HttpError(404, "Company not found")
            }
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error fetching company")
        }
    }

    async create(createCompanyDto: CreateCompanyDto, userId: number): Promise<Company> {
        try {
            const employer = await this.userService.getEmployerByUserId(userId);
            
            const company = new Company()
            company.name = createCompanyDto.name
            if (createCompanyDto.description !== undefined) {
                company.description = createCompanyDto.description
            }
            company.employerId = employer.id
            
            return await this.repository.save(company)
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in CompanyController.create:", error)
            throw new HttpError(500, "Error creating company", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        try {
            const companyId = parseInt(id)
            if (isNaN(companyId)) {
                throw new HttpError(400, "Invalid company ID format")
            }

            const companyToUpdate = await this.repository.findOne({
                where: { id: companyId }
            })

            if (!companyToUpdate) {
                throw new HttpError(404, "Company not found to update")
            }

            if (updateCompanyDto.name) {
                companyToUpdate.name = updateCompanyDto.name
            }
            if (updateCompanyDto.description !== undefined) {
                companyToUpdate.description = updateCompanyDto.description
            }

            await this.repository.save(companyToUpdate)
            
            const updatedItem = await this.repository.findOne({
                where: { id: companyId },
                relations: ['jobOffers']
            })

            if (!updatedItem) {
                throw new HttpError(500, "Failed to retrieve company after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error updating company", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const companyId = parseInt(id)
            if (isNaN(companyId)) {
                throw new HttpError(400, "Invalid company ID format")
            }
            const deleteResult = await this.repository.delete(companyId)
            if (deleteResult.affected === 0) {
                throw new HttpError(404, "Company not found for deletion")
            }
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error deleting company")
        }
    }

    async getByEmployerId(employerIdParam: string): Promise<Company[]> {
        try {
            const employerId = parseInt(employerIdParam)
            if (isNaN(employerId)) {
                throw new HttpError(400, "Invalid employer ID format")
            }
            const items = await this.repository.find({
                where: { employerId: employerId },
                relations: ['jobOffers']
            })
            return items
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error fetching companies by employer ID")
        }
    }
} 