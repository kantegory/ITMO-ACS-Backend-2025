import { Repository } from "typeorm"
import { Company } from "../models/Company"
import { EmployerCabinet } from "../models/EmployerCabinet"
import { myDataSource } from "../config/data-source"
import { CreateCompanyDto, UpdateCompanyDto } from "../routes/CompanyRoutes/CompanySchemas"
import { HttpError } from "../errors/HttpErrors"

export class CompanyController {
    private repository: Repository<Company>
    private employerRepository: Repository<EmployerCabinet>

    constructor() {
        this.repository = myDataSource.getRepository(Company)
        this.employerRepository = myDataSource.getRepository(EmployerCabinet)
    }

    async getAll(): Promise<Company[]> {
        try {
            const items = await this.repository.find({
                relations: ['employer', 'jobOffers']
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
                relations: ['employer', 'jobOffers']
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

    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        try {
            const employerId = createCompanyDto.employerId;
            if (!Number.isInteger(employerId) || employerId <= 0) {
                throw new HttpError(400, "Invalid Employer ID. Must be a positive integer.");
            }

            const employer = await this.employerRepository.findOneBy({ id: employerId })
            if (!employer) {
                throw new HttpError(404, `Employer with ID ${employerId} not found`)
            }

            const companyToCreate = new Company()
            companyToCreate.name = createCompanyDto.name
            companyToCreate.employer = employer
            if (createCompanyDto.description !== undefined) {
                companyToCreate.description = createCompanyDto.description
            }

            const item = await this.repository.save(companyToCreate)
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
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
                where: { id: companyId },
                relations: ['employer']
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
                relations: ['employer', 'jobOffers']
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
                where: { employer: { id: employerId } },
                relations: ['employer', 'jobOffers']
            })
            return items
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error fetching companies by employer ID")
        }
    }
} 