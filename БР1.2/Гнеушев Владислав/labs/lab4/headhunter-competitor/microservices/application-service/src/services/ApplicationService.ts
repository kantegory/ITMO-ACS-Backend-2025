import { Repository } from "typeorm";
import { Application, ApplicationStatus } from "../models/Application";
import { applicationDataSource } from "../config/data-source";
import { userServiceClient, jobServiceClient } from "../utils/httpClient";
import { ResumeService } from "./ResumeService";

export interface CreateApplicationDto {
    employeeId: number;
    jobOfferId: number;
    resumeId: number;
    coverLetter?: string;
}

export interface UpdateApplicationDto {
    status?: ApplicationStatus;
    seenByEmployer?: boolean;
}

export class ApplicationService {
    private applicationRepository: Repository<Application>;
    private resumeService: ResumeService;

    constructor() {
        this.applicationRepository = applicationDataSource.getRepository(Application);
        this.resumeService = new ResumeService();
    }

    async createApplication(createApplicationDto: CreateApplicationDto): Promise<Application> {
        try {
            await userServiceClient.get(`/api/users/${createApplicationDto.employeeId}`);
        } catch (error) {
            throw new Error('Employee not found');
        }

        try {
            await jobServiceClient.get(`/api/job-offers/${createApplicationDto.jobOfferId}`);
        } catch (error) {
            throw new Error('Job offer not found');
        }

        const resume = await this.resumeService.getResumeById(createApplicationDto.resumeId);
        if (!resume || resume.employeeId !== createApplicationDto.employeeId) {
            throw new Error('Resume not found or does not belong to employee');
        }

        const existingApplication = await this.applicationRepository.findOne({
            where: {
                employeeId: createApplicationDto.employeeId,
                jobOfferId: createApplicationDto.jobOfferId
            }
        });

        if (existingApplication) {
            throw new Error('Application for this job already exists');
        }

        const application = new Application();
        application.employeeId = createApplicationDto.employeeId;
        application.jobOfferId = createApplicationDto.jobOfferId;
        application.resumeId = createApplicationDto.resumeId;
        application.coverLetter = createApplicationDto.coverLetter;

        return await this.applicationRepository.save(application);
    }

    async getApplicationById(id: number): Promise<Application | null> {
        return await this.applicationRepository.findOne({
            where: { id }
        });
    }

    async getApplicationsByEmployeeId(employeeId: number): Promise<Application[]> {
        return await this.applicationRepository.find({
            where: { employeeId },
            order: { appliedAt: 'DESC' }
        });
    }

    async getApplicationsByJobOfferId(jobOfferId: number): Promise<Application[]> {
        return await this.applicationRepository.find({
            where: { jobOfferId },
            order: { appliedAt: 'DESC' }
        });
    }

    async getAllApplications(page: number = 1, limit: number = 10): Promise<{ applications: Application[]; total: number }> {
        const [applications, total] = await this.applicationRepository.findAndCount({
            order: { appliedAt: 'DESC' },
            skip: (page - 1) * limit,
            take: limit
        });

        return { applications, total };
    }

    async updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<Application> {
        const application = await this.getApplicationById(id);
        if (!application) {
            throw new Error('Application not found');
        }

        Object.assign(application, updateApplicationDto);
        return await this.applicationRepository.save(application);
    }

    async deleteApplication(id: number): Promise<void> {
        const result = await this.applicationRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Application not found');
        }
    }

    async getApplicationStats(employeeId?: number): Promise<any> {
        const queryBuilder = this.applicationRepository.createQueryBuilder('application');
        
        if (employeeId) {
            queryBuilder.where('application.employeeId = :employeeId', { employeeId });
        }

        const [
            total,
            pending,
            reviewed,
            accepted,
            rejected
        ] = await Promise.all([
            queryBuilder.getCount(),
            queryBuilder.clone().andWhere('application.status = :status', { status: ApplicationStatus.PENDING }).getCount(),
            queryBuilder.clone().andWhere('application.status = :status', { status: ApplicationStatus.REVIEWED }).getCount(),
            queryBuilder.clone().andWhere('application.status = :status', { status: ApplicationStatus.ACCEPTED }).getCount(),
            queryBuilder.clone().andWhere('application.status = :status', { status: ApplicationStatus.REJECTED }).getCount()
        ]);

        return {
            total,
            byStatus: {
                pending,
                reviewed,
                accepted,
                rejected
            }
        };
    }

    async markAsSeen(id: number): Promise<Application> {
        return await this.updateApplication(id, { seenByEmployer: true });
    }
} 