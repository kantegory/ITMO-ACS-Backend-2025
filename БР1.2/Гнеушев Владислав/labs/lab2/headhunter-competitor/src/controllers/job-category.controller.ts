import { Repository } from "typeorm"
import { JobCategory } from "../models/JobCategory"
import { myDataSource } from "../config/data-source"
import { CreateJobCategoryDto, UpdateJobCategoryDto } from "../routes/JobCategoryRoutes/JobCategorySchemas"
import { HttpError } from "../errors/HttpErrors"

export class JobCategoryController {
    private repository: Repository<JobCategory>

    constructor() {
        this.repository = myDataSource.getRepository(JobCategory)
    }

    async getAll(): Promise<JobCategory[]> {
        try {
            const items = await this.repository.find({
                relations: ['jobOffers']
            })
            return items
        } catch (error) {
            throw new HttpError(500, "Error fetching job categories")
        }
    }

    async getById(id: string): Promise<JobCategory> {
        try {
            const categoryId = parseInt(id)
            if (isNaN(categoryId)) {
                throw new HttpError(400, "Invalid job category ID format")
            }
            const item = await this.repository.findOne({
                where: { id: categoryId },
                relations: ['jobOffers']
            })
            if (!item) {
                throw new HttpError(404, "Job category not found")
            }
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error fetching job category")
        }
    }

    async create(createJobCategoryDto: CreateJobCategoryDto): Promise<JobCategory> {
        try {
            const item = this.repository.create(createJobCategoryDto)
            await this.repository.save(item)
            return item
        } catch (error) {
            throw new HttpError(500, "Error creating job category", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateJobCategoryDto: UpdateJobCategoryDto): Promise<JobCategory> {
        try {
            const categoryId = parseInt(id)
            if (isNaN(categoryId)) {
                throw new HttpError(400, "Invalid job category ID format")
            }

            const itemToUpdate = await this.repository.findOneBy({ id: categoryId })
            if (!itemToUpdate) {
                throw new HttpError(404, "Job category not found to update")
            }

            if (updateJobCategoryDto.name) {
                itemToUpdate.name = updateJobCategoryDto.name
            }
            
            await this.repository.save(itemToUpdate)

            const updatedItem = await this.repository.findOne({
                 where: { id: categoryId },
                 relations: ['jobOffers']
            })
            if (!updatedItem) {
                throw new HttpError(500, "Failed to retrieve job category after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error updating job category", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const categoryId = parseInt(id)
            if (isNaN(categoryId)) {
                throw new HttpError(400, "Invalid job category ID format")
            }
            const deleteResult = await this.repository.delete(categoryId)
            if (deleteResult.affected === 0) {
                throw new HttpError(404, "Job category not found for deletion")
            }
        } catch (error) {
            if (error instanceof HttpError) throw error
            throw new HttpError(500, "Error deleting job category")
        }
    }
} 