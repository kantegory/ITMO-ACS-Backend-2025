import { Repository } from "typeorm"
import { EmployerCabinet } from "../models/EmployerCabinet"
import { User } from "../models/User"
import { myDataSource } from "../config/data-source"
import { CreateEmployerCabinetDto, UpdateEmployerCabinetDto } from "../routes/EmployerCabinetRoutes/EmployerCabinetSchemas"
import { HttpError } from "../errors/HttpErrors"

export class EmployerCabinetController {
    private repository: Repository<EmployerCabinet>
    private userRepository: Repository<User>

    constructor() {
        this.repository = myDataSource.getRepository(EmployerCabinet)
        this.userRepository = myDataSource.getRepository(User)
    }

    async getAll(): Promise<EmployerCabinet[]> {
        try {
            return await this.repository.find({ relations: ['user', 'companies'] })
        } catch (error) {
            console.error("Error in EmployerCabinetController.getAll:", error)
            throw new HttpError(500, "Error fetching employer cabinets")
        }
    }

    async getById(id: string): Promise<EmployerCabinet> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employer cabinet ID format")

            const item = await this.repository.findOne({ 
                where: { id: cabinetId }, 
                relations: ['user', 'companies'] 
            })
            if (!item) throw new HttpError(404, "Employer cabinet not found")
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployerCabinetController.getById:", error)
            throw new HttpError(500, "Error fetching employer cabinet")
        }
    }

    async create(createDto: CreateEmployerCabinetDto): Promise<EmployerCabinet> {
        try {
            const userId = createDto.userId;
            
            const user = await this.userRepository.findOneBy({ id: userId })
            if (!user) throw new HttpError(404, `User with ID ${userId} not found`)

            const existingCabinet = await this.repository.findOne({ where: { user: { id: userId } } })
            if (existingCabinet) {
                throw new HttpError(409, `Employer cabinet already exists for user ID ${userId}`)
            }

            const employerCabinet = new EmployerCabinet()
            employerCabinet.user = user
            
            return await this.repository.save(employerCabinet)
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployerCabinetController.create:", error)
            throw new HttpError(500, "Error creating employer cabinet", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateDto: UpdateEmployerCabinetDto): Promise<EmployerCabinet> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employer cabinet ID format")

            const cabinetToUpdate = await this.repository.findOne({ 
                where: { id: cabinetId },
                relations: ['user', 'companies']
            })
            if (!cabinetToUpdate) throw new HttpError(404, "Employer cabinet not found to update")

            return cabinetToUpdate
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployerCabinetController.update:", error)
            throw new HttpError(500, "Error updating employer cabinet", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const cabinetId = parseInt(id)
            if (isNaN(cabinetId)) throw new HttpError(400, "Invalid employer cabinet ID format")

            const deleteResult = await this.repository.delete(cabinetId)
            if (deleteResult.affected === 0) throw new HttpError(404, "Employer cabinet not found for deletion")
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployerCabinetController.delete:", error)
            throw new HttpError(500, "Error deleting employer cabinet")
        }
    }

    async getByUserId(userIdParam: string): Promise<EmployerCabinet> {
        try {
            const userId = parseInt(userIdParam)
            if (isNaN(userId)) throw new HttpError(400, "Invalid User ID format")

            const item = await this.repository.findOne({ 
                where: { user: { id: userId } }, 
                relations: ['user', 'companies'] 
            })
            if (!item) throw new HttpError(404, `Employer cabinet not found for user ID ${userId}`)
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in EmployerCabinetController.getByUserId:", error)
            throw new HttpError(500, "Error fetching employer cabinet by user ID")
        }
    }
} 