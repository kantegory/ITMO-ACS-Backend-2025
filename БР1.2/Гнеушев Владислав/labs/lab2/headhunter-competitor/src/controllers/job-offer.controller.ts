import { In, Repository } from "typeorm"
import { JobOffer } from "../models/JobOffer"
import { Company } from "../models/Company"
import { JobCategory } from "../models/JobCategory"
import { Skill } from "../models/Skill"
import { JobOfferRequiredSkill } from "../models/JobOfferRequiredSkill"
import { myDataSource } from "../config/data-source"
import { CreateJobOfferDto, UpdateJobOfferDto } from "../routes/JobOfferRoutes/JobOfferSchemas"
import { HttpError } from "../errors/HttpErrors"

export class JobOfferController {
    private repository: Repository<JobOffer>
    private companyRepository: Repository<Company>
    private jobCategoryRepository: Repository<JobCategory>
    private skillRepository: Repository<Skill>
    private jobOfferRequiredSkillRepository: Repository<JobOfferRequiredSkill>

    constructor() {
        this.repository = myDataSource.getRepository(JobOffer)
        this.companyRepository = myDataSource.getRepository(Company)
        this.jobCategoryRepository = myDataSource.getRepository(JobCategory)
        this.skillRepository = myDataSource.getRepository(Skill)
        this.jobOfferRequiredSkillRepository = myDataSource.getRepository(JobOfferRequiredSkill)
    }

    async getAll(): Promise<JobOffer[]> {
        try {
            return await this.repository.find({
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
        } catch (error) {
            console.error("Error in JobOfferController.getAll:", error)
            throw new HttpError(500, "Error fetching job offers")
        }
    }

    async getById(id: string): Promise<JobOffer> {
        try {
            const offerId = parseInt(id)
            if (isNaN(offerId)) throw new HttpError(400, "Invalid job offer ID format")

            const item = await this.repository.findOne({
                where: { id: offerId },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
            if (!item) throw new HttpError(404, "Job offer not found")
            return item
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.getById:", error)
            throw new HttpError(500, "Error fetching job offer")
        }
    }

    async create(createDto: CreateJobOfferDto): Promise<JobOffer> {
        try {
            const companyId = createDto.companyId;
            if (!Number.isInteger(companyId) || companyId <= 0) {
                throw new HttpError(400, "Invalid Company ID. Must be a positive integer.");
            }

            const categoryId = createDto.categoryId;
            if (!Number.isInteger(categoryId) || categoryId <= 0) {
                throw new HttpError(400, "Invalid Category ID. Must be a positive integer.");
            }

            const company = await this.companyRepository.findOneBy({ id: companyId });
            if (!company) throw new HttpError(404, `Company with ID ${companyId} not found`)

            const jobCategory = await this.jobCategoryRepository.findOneBy({ id: categoryId });
            if (!jobCategory) throw new HttpError(404, `Job Category with ID ${categoryId} not found`)

            const jobOffer = new JobOffer()
            jobOffer.name = createDto.title
            jobOffer.description = createDto.description
            jobOffer.company = company
            jobOffer.jobCategory = jobCategory
            jobOffer.is_active = true

            if (createDto.requirements !== undefined) {
                jobOffer.requirements = createDto.requirements;
            }
            if (createDto.required_experience_months !== undefined) {
                jobOffer.required_experience_months = createDto.required_experience_months;
            }
            if (createDto.salary_from_rub !== undefined) {
                jobOffer.salary_from_rub = createDto.salary_from_rub;
            }
            if (createDto.salary_to_rub !== undefined) {
                jobOffer.salary_to_rub = createDto.salary_to_rub;
            }

            const savedJobOffer = await this.repository.save(jobOffer)

            if (createDto.skillIds && createDto.skillIds.length > 0) {
                const skills = await this.skillRepository.findBy({ id: In(createDto.skillIds) });
                if (skills.length !== createDto.skillIds.length) {
                    console.warn("Some skill IDs provided for JobOffer creation were not found.");
                }
                const requiredSkillsEntries = skills.map(skill => {
                    const jors = new JobOfferRequiredSkill();
                    jors.jobOffer = savedJobOffer;
                    jors.skill = skill;
                    return jors;
                });
                await this.jobOfferRequiredSkillRepository.save(requiredSkillsEntries);
            }
            return await this.repository.findOne({
                where: { id: savedJobOffer.id },
                relations: ['company', 'jobCategory', 'requiredSkills', 'requiredSkills.skill', 'applications']
            }) as JobOffer;

        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.create:", error)
            throw new HttpError(500, "Error creating job offer", error instanceof Error ? error.message : undefined)
        }
    }

    async update(id: string, updateDto: UpdateJobOfferDto): Promise<JobOffer> {
        try {
            const offerId = parseInt(id)
            if (isNaN(offerId)) throw new HttpError(400, "Invalid job offer ID format")

            let jobOfferToUpdate = await this.repository.findOneBy({ id: offerId })
            if (!jobOfferToUpdate) throw new HttpError(404, "Job offer not found to update")

            if (updateDto.title !== undefined) jobOfferToUpdate.name = updateDto.title
            if (updateDto.description !== undefined) jobOfferToUpdate.description = updateDto.description
            if (updateDto.requirements !== undefined) {
                jobOfferToUpdate.requirements = updateDto.requirements;
            }
            if (updateDto.required_experience_months !== undefined) {
                jobOfferToUpdate.required_experience_months = updateDto.required_experience_months;
            }
            if (updateDto.salary_from_rub !== undefined) {
                jobOfferToUpdate.salary_from_rub = updateDto.salary_from_rub;
            }
            if (updateDto.salary_to_rub !== undefined) {
                jobOfferToUpdate.salary_to_rub = updateDto.salary_to_rub;
            }
            if (updateDto.is_active !== undefined) {
                jobOfferToUpdate.is_active = updateDto.is_active;
            }
            
            await this.repository.save(jobOfferToUpdate)

            if (updateDto.skillIds !== undefined) {
                await this.jobOfferRequiredSkillRepository.delete({ jobOffer: { id: offerId } });

                if (updateDto.skillIds.length > 0) {
                    const skills = await this.skillRepository.findBy({ id: In(updateDto.skillIds) });
                    if (skills.length !== updateDto.skillIds.length) {
                         console.warn("Some skill IDs provided for JobOffer update were not found.");
                    }
                    const requiredSkillsEntries = skills.map(skill => {
                        const jors = new JobOfferRequiredSkill();
                        jors.jobOffer = jobOfferToUpdate as JobOffer;
                        jors.skill = skill;
                        return jors;
                    });
                    await this.jobOfferRequiredSkillRepository.save(requiredSkillsEntries);
                }
            }
            const updatedItem = await this.repository.findOne({
                where: { id: offerId },
                relations: ['company', 'jobCategory', 'requiredSkills', 'requiredSkills.skill', 'applications']
            })
            if (!updatedItem) {
                console.error(`Failed to retrieve job offer ${offerId} after update, though save was successful.`)
                throw new HttpError(500, "Failed to retrieve job offer after update")
            }
            return updatedItem
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.update:", error)
            throw new HttpError(500, "Error updating job offer", error instanceof Error ? error.message : undefined)
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const offerId = parseInt(id)
            if (isNaN(offerId)) throw new HttpError(400, "Invalid job offer ID format")

            const deleteResult = await this.repository.delete(offerId)
            if (deleteResult.affected === 0) throw new HttpError(404, "Job offer not found for deletion")
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.delete:", error)
            throw new HttpError(500, "Error deleting job offer")
        }
    }

    async getByCompanyId(companyIdParam: string): Promise<JobOffer[]> {
        try {
            const companyId = parseInt(companyIdParam)
            if (isNaN(companyId)) throw new HttpError(400, "Invalid Company ID format")

            return await this.repository.find({
                where: { company: { id: companyId } },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.getByCompanyId:", error)
            throw new HttpError(500, "Error fetching job offers by company ID")
        }
    }

    async getByCategoryId(categoryIdParam: string): Promise<JobOffer[]> {
        try {
            const categoryId = parseInt(categoryIdParam)
            if (isNaN(categoryId)) throw new HttpError(400, "Invalid Job Category ID format")

            return await this.repository.find({
                where: { jobCategory: { id: categoryId } },
                relations: ['company', 'jobCategory', 'requiredSkills', 'applications']
            })
        } catch (error) {
            if (error instanceof HttpError) throw error
            console.error("Error in JobOfferController.getByCategoryId:", error)
            throw new HttpError(500, "Error fetching job offers by category ID")
        }
    }
} 