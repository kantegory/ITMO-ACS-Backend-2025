import { Repository } from "typeorm"
import { Skill } from "../models/Skill"
import { myDataSource } from "../config/data-source"
import { CreateSkillDto, UpdateSkillDto } from "../routes/SkillRoutes/SkillSchemas"
import { HttpError } from "../errors/HttpErrors"

export class SkillController {
    private repository: Repository<Skill>

    constructor() {
        this.repository = myDataSource.getRepository(Skill)
    }

    async getAll(): Promise<Skill[]> {
        try {
            return await this.repository.find({
                relations: ['resumeSkills', 'jobOfferSkills']
            })
        } catch (error) {
            console.error("Error in SkillController.getAll:", error)
            throw new HttpError(500, "Error fetching skills")
        }
    }

    async getById(id: string): Promise<Skill> {
        try {
            const skillId = parseInt(id)
            if (isNaN(skillId)) throw new HttpError(400, "Invalid skill ID format")

            const item = await this.repository.findOne({
                where: { id: skillId },
                relations: ['resumeSkills', 'jobOfferSkills']
            })
            if (!item) throw new HttpError(404, "Skill not found")
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in SkillController.getById:", error)
            throw new HttpError(500, "Error fetching skill")
        }
    }

    async create(createDto: CreateSkillDto): Promise<Skill> {
        try {
            const skill = this.repository.create(createDto)
            return await this.repository.save(skill)
        } catch (error) {
            console.error("Error in SkillController.create:", error)
            throw new HttpError(500, "Error creating skill", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateDto: UpdateSkillDto): Promise<Skill> {
        try {
            const skillId = parseInt(id)
            if (isNaN(skillId)) throw new HttpError(400, "Invalid skill ID format")

            const skillToUpdate = await this.repository.findOneBy({ id: skillId })
            if (!skillToUpdate) throw new HttpError(404, "Skill not found to update")

            if (updateDto.name !== undefined) {
                skillToUpdate.name = updateDto.name
            }
            
            await this.repository.save(skillToUpdate)
            const updatedItem = await this.repository.findOne({
                where: { id: skillId },
                relations: ['resumeSkills', 'jobOfferSkills']
            })
            if (!updatedItem) {
                console.error(`Failed to retrieve skill ${skillId} after update.`)
                throw new HttpError(500, "Failed to retrieve skill after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in SkillController.update:", error)
            throw new HttpError(500, "Error updating skill", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const skillId = parseInt(id)
            if (isNaN(skillId)) throw new HttpError(400, "Invalid skill ID format")

            const deleteResult = await this.repository.delete(skillId)
            if (deleteResult.affected === 0) throw new HttpError(404, "Skill not found for deletion")
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in SkillController.delete:", error)
            throw new HttpError(500, "Error deleting skill")
        }
    }
} 