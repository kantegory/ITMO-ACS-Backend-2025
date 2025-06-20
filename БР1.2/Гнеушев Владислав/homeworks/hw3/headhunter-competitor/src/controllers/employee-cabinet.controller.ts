import { Repository } from "typeorm"
import { EmployeeCabinet } from "../models/EmployeeCabinet"
import { User } from "../models/User"
import { myDataSource } from "../config/data-source"
import { CreateEmployeeCabinetDto, UpdateEmployeeCabinetDto } from "../routes/EmployeeCabinetRoutes/EmployeeCabinetSchemas"
import { HttpError } from "../errors/HttpErrors"

export class EmployeeCabinetController {
    private repository: Repository<EmployeeCabinet>
    private userRepository: Repository<User>

    constructor() {
        this.repository = myDataSource.getRepository(EmployeeCabinet)
        this.userRepository = myDataSource.getRepository(User)
    }

    async getAll(): Promise<EmployeeCabinet[]> {
        try {
            return await this.repository.find({ relations: ['user', 'resumes', 'applications'] })
        } catch (error) {
            console.error("Error in EmployeeCabinetController.getAll:", error)
            throw new HttpError(500, "Error fetching employee cabinets")
        }
    }

    async getById(id: string): Promise<EmployeeCabinet> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employee cabinet ID format")

            const item = await this.repository.findOne({ 
                where: { id: cabinetId }, 
                relations: ['user', 'resumes', 'applications'] 
            })
            if (!item) throw new HttpError(404, "Employee cabinet not found")
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployeeCabinetController.getById:", error)
            throw new HttpError(500, "Error fetching employee cabinet")
        }
    }

    async create(createDto: CreateEmployeeCabinetDto): Promise<EmployeeCabinet> {
        try {
            const userId = createDto.userId;
            
            const user = await this.userRepository.findOneBy({ id: userId })
            if (!user) throw new HttpError(404, `User with ID ${userId} not found`)

            const existingCabinet = await this.repository.findOne({ where: { user: { id: userId } } })
            if (existingCabinet) {
                throw new HttpError(409, `Employee cabinet already exists for user ID ${userId}`)
            }

            const employeeCabinet = new EmployeeCabinet()
            employeeCabinet.user = user
            employeeCabinet.first_name = createDto.firstName; 
            employeeCabinet.last_name = createDto.lastName;
            employeeCabinet.resume_text = createDto.profileInfo
            employeeCabinet.updated_resume_at = new Date()
            
            return await this.repository.save(employeeCabinet)
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployeeCabinetController.create:", error)
            throw new HttpError(500, "Error creating employee cabinet", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateDto: UpdateEmployeeCabinetDto): Promise<EmployeeCabinet> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employee cabinet ID format")

            const cabinetToUpdate = await this.repository.findOneBy({ id: cabinetId })
            if (!cabinetToUpdate) throw new HttpError(404, "Employee cabinet not found to update")

            let hasChanges = false;
            if (updateDto.firstName !== undefined) {
                cabinetToUpdate.first_name = updateDto.firstName;
                hasChanges = true;
            }
            if (updateDto.lastName !== undefined) {
                cabinetToUpdate.last_name = updateDto.lastName;
                hasChanges = true;
            }
            if (updateDto.profileInfo !== undefined) {
                cabinetToUpdate.resume_text = updateDto.profileInfo
                cabinetToUpdate.updated_resume_at = new Date()
                hasChanges = true;
            }
            
            if (hasChanges) {
                await this.repository.save(cabinetToUpdate)
            }
            
            const updatedItem = await this.repository.findOne({
                where: {id: cabinetId},
                relations: ['user', 'resumes', 'applications'] 
            })
            if (!updatedItem) {
                console.error(`Failed to retrieve employee cabinet ${cabinetId} after update`)
                throw new HttpError(500, "Failed to retrieve employee cabinet after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployeeCabinetController.update:", error)
            throw new HttpError(500, "Error updating employee cabinet", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employee cabinet ID format")

            const deleteResult = await this.repository.delete(cabinetId)
            if (deleteResult.affected === 0) throw new HttpError(404, "Employee cabinet not found for deletion")
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployeeCabinetController.delete:", error)
            throw new HttpError(500, "Error deleting employee cabinet")
        }
    }

    async getByUserId(userIdParam: string): Promise<EmployeeCabinet> {
        try {
            const userId = parseInt(userIdParam)
            if (isNaN(userId)) throw new HttpError(400, "Invalid User ID format")

            const item = await this.repository.findOne({ 
                where: { user: { id: userId } }, 
                relations: ['user', 'resumes', 'applications'] 
            })
            if (!item) throw new HttpError(404, `Employee cabinet not found for user ID ${userId}`)
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployeeCabinetController.getByUserId:", error)
            throw new HttpError(500, "Error fetching employee cabinet by user ID")
        }
    }
} 