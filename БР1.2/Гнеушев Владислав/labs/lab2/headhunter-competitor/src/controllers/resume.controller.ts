import { In, Repository } from "typeorm"
import { Resume } from "../models/Resume"
import { EmployeeCabinet } from "../models/EmployeeCabinet"
import { Skill } from "../models/Skill"
import { ResumeSkill } from "../models/ResumeSkill"
import { myDataSource } from "../config/data-source"
import { CreateResumeDto, UpdateResumeDto } from "../routes/ResumeRoutes/ResumeSchemas"
import { HttpError } from "../errors/HttpErrors"

export class ResumeController {
    private repository: Repository<Resume>
    private employeeCabinetRepository: Repository<EmployeeCabinet>
    private skillRepository: Repository<Skill>
    private resumeSkillRepository: Repository<ResumeSkill>

    constructor() {
        this.repository = myDataSource.getRepository(Resume)
        this.employeeCabinetRepository = myDataSource.getRepository(EmployeeCabinet)
        this.skillRepository = myDataSource.getRepository(Skill)
        this.resumeSkillRepository = myDataSource.getRepository(ResumeSkill)
    }

    async getAll(): Promise<Resume[]> {
        try {
            return await this.repository.find({ relations: ['employee', 'skills'] })
        } catch (error) {
            console.error("Error in ResumeController.getAll:", error)
            throw new HttpError(500, "Error fetching resumes")
        }
    }

    async getById(id: string): Promise<Resume> {
        try {
            const resumeId = parseInt(id)
            if (isNaN(resumeId)) throw new HttpError(400, "Invalid resume ID format")

            const item = await this.repository.findOne({ 
                where: { id: resumeId }, 
                relations: ['employee', 'skills'] 
            })
            if (!item) throw new HttpError(404, "Resume not found")
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in ResumeController.getById:", error)
            throw new HttpError(500, "Error fetching resume")
        }
    }

    async create(createDto: CreateResumeDto): Promise<Resume> {
        try {
            const employeeId = createDto.employeeId;
            if (!Number.isInteger(employeeId) || employeeId <= 0) {
                throw new HttpError(400, "Invalid Employee ID. Must be a positive integer.");
            }

            const employeeCabinet = await this.employeeCabinetRepository.findOneBy({ id: employeeId });
            if (!employeeCabinet) throw new HttpError(404, `EmployeeCabinet with ID ${employeeId} not found`)

            const resume = new Resume()
            resume.text = createDto.content
            resume.employee = employeeCabinet
            
            const savedResume = await this.repository.save(resume)

            if (createDto.skillIds && createDto.skillIds.length > 0) {
                const skills = await this.skillRepository.findBy({ id: In(createDto.skillIds) });
                if (skills.length !== createDto.skillIds.length) {
                    console.warn("Some skill IDs provided for Resume creation were not found.");
                }
                const resumeSkillEntries = skills.map(skill => {
                    const rs = new ResumeSkill();
                    rs.resume = savedResume;
                    rs.skill = skill;
                    return rs;
                });
                await this.resumeSkillRepository.save(resumeSkillEntries);
            }
            return await this.repository.findOne({
                where: { id: savedResume.id },
                relations: ['employee', 'skills', 'skills.skill']
            }) as Resume;

        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in ResumeController.create:", error)
            throw new HttpError(500, "Error creating resume", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateDto: UpdateResumeDto): Promise<Resume> {
        try {
            const resumeId = parseInt(id)
            if (isNaN(resumeId)) throw new HttpError(400, "Invalid resume ID format")

            let resumeToUpdate = await this.repository.findOneBy({ id: resumeId })
            if (!resumeToUpdate) throw new HttpError(404, "Resume not found to update")

            if (updateDto.content !== undefined) {
                resumeToUpdate.text = updateDto.content
            }
            
            await this.repository.save(resumeToUpdate);

            if (updateDto.skillIds !== undefined) {
                await this.resumeSkillRepository.delete({ resume: { id: resumeId } });

                if (updateDto.skillIds.length > 0) {
                    const skills = await this.skillRepository.findBy({ id: In(updateDto.skillIds) });
                    if (skills.length !== updateDto.skillIds.length) {
                        console.warn("Some skill IDs provided for Resume update were not found.");
                    }
                    const resumeSkillEntries = skills.map(skill => {
                        const rs = new ResumeSkill();
                        rs.resume = resumeToUpdate as Resume;
                        rs.skill = skill;
                        return rs;
                    });
                    await this.resumeSkillRepository.save(resumeSkillEntries);
                }
            }
            
            const updatedItem = await this.repository.findOne({
                where: {id: resumeId},
                relations: ['employee', 'skills', 'skills.skill']
            })
            if (!updatedItem) {
                console.error(`Failed to retrieve resume ${resumeId} after update`)
                throw new HttpError(500, "Failed to retrieve resume after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in ResumeController.update:", error)
            throw new HttpError(500, "Error updating resume", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const resumeId = parseInt(id)
            if (isNaN(resumeId)) throw new HttpError(400, "Invalid resume ID format")

            const deleteResult = await this.repository.delete(resumeId)
            if (deleteResult.affected === 0) throw new HttpError(404, "Resume not found for deletion")
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in ResumeController.delete:", error)
            throw new HttpError(500, "Error deleting resume")
        }
    }

    async getByEmployeeId(employeeIdParam: string): Promise<Resume[]> {
        try {
            const employeeId = parseInt(employeeIdParam)
            if (isNaN(employeeId)) throw new HttpError(400, "Invalid Employee ID format")

            return await this.repository.find({
                where: { employee: { id: employeeId } },
                relations: ['employee', 'skills']
            })
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in ResumeController.getByEmployeeId:", error)
            throw new HttpError(500, "Error fetching resumes by employee ID")
        }
    }
} 