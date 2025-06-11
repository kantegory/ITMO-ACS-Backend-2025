import { Repository } from "typeorm";
import { Resume } from "../models/Resume";
import { ResumeSkill } from "../models/ResumeSkill";
import { applicationDataSource } from "../config/data-source";
import { userServiceClient, jobServiceClient } from "../utils/httpClient";

export interface CreateResumeDto {
    employeeId: number;
    text: string;
    title?: string;
    experienceYears?: number;
    expectedSalary?: number;
    skillIds?: number[];
}

export interface UpdateResumeDto {
    text?: string;
    title?: string;
    experienceYears?: number;
    expectedSalary?: number;
    isActive?: boolean;
    skillIds?: number[];
}

export class ResumeService {
    private resumeRepository: Repository<Resume>;
    private resumeSkillRepository: Repository<ResumeSkill>;

    constructor() {
        this.resumeRepository = applicationDataSource.getRepository(Resume);
        this.resumeSkillRepository = applicationDataSource.getRepository(ResumeSkill);
    }

    async createResume(createResumeDto: CreateResumeDto): Promise<Resume> {
        try {
            await userServiceClient.get(`/api/users/${createResumeDto.employeeId}`);
        } catch (error) {
            throw new Error('Employee not found');
        }

        const resume = new Resume();
        resume.employeeId = createResumeDto.employeeId;
        resume.text = createResumeDto.text;
        resume.title = createResumeDto.title;
        resume.experienceYears = createResumeDto.experienceYears;
        resume.expectedSalary = createResumeDto.expectedSalary;

        const savedResume = await this.resumeRepository.save(resume);

        if (createResumeDto.skillIds && createResumeDto.skillIds.length > 0) {
            await this.addSkillsToResume(savedResume.id, createResumeDto.skillIds);
        }

        return await this.getResumeById(savedResume.id) as Resume;
    }

    async getResumeById(id: number): Promise<Resume | null> {
        return await this.resumeRepository.findOne({
            where: { id },
            relations: ['skills']
        });
    }

    async getResumesByEmployeeId(employeeId: number): Promise<Resume[]> {
        return await this.resumeRepository.find({
            where: { employeeId },
            relations: ['skills'],
            order: { createdAt: 'DESC' }
        });
    }

    async getAllResumes(page: number = 1, limit: number = 10): Promise<{ resumes: Resume[]; total: number }> {
        const [resumes, total] = await this.resumeRepository.findAndCount({
            where: { isActive: true },
            relations: ['skills'],
            order: { createdAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit
        });

        return { resumes, total };
    }

    async updateResume(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
        const resume = await this.getResumeById(id);
        if (!resume) {
            throw new Error('Resume not found');
        }

        Object.assign(resume, updateResumeDto);
        await this.resumeRepository.save(resume);

        if (updateResumeDto.skillIds !== undefined) {
            await this.resumeSkillRepository.delete({ resume: { id } });
            if (updateResumeDto.skillIds.length > 0) {
                await this.addSkillsToResume(id, updateResumeDto.skillIds);
            }
        }

        return await this.getResumeById(id) as Resume;
    }

    async deleteResume(id: number): Promise<void> {
        const result = await this.resumeRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Resume not found');
        }
    }

    private async addSkillsToResume(resumeId: number, skillIds: number[]): Promise<void> {
        try {
            const skillsData: any = await jobServiceClient.post('/api/skills/batch', { ids: skillIds });
            
            for (const skillData of skillsData.data || []) {
                const resumeSkill = new ResumeSkill();
                resumeSkill.skillId = skillData.id;
                resumeSkill.skillName = skillData.name;
                resumeSkill.resume = { id: resumeId } as Resume;
                await this.resumeSkillRepository.save(resumeSkill);
            }
        } catch (error) {
            console.warn('Failed to fetch skills from job-service:', error);
            for (const skillId of skillIds) {
                const resumeSkill = new ResumeSkill();
                resumeSkill.skillId = skillId;
                resumeSkill.skillName = `Skill ${skillId}`;
                resumeSkill.resume = { id: resumeId } as Resume;
                await this.resumeSkillRepository.save(resumeSkill);
            }
        }
    }
} 