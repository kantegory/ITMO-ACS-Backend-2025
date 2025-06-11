import { ApplicationService } from '../services/ApplicationService';
import { CreateApplicationDto, UpdateApplicationDto, GetApplicationsQueryDto} from '../routes/ApplicationDtos';
import { HttpError, BadRequestError, NotFoundError, ConflictError, InternalServerError } from '../errors/HttpErrors';
import { UserService } from '../services/UserService';

export type ApplicationResponse = {
    success: boolean;
    data?: any;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
};

export class ApplicationController {
    private applicationService: ApplicationService;
    private userService: UserService;

    constructor() {
        this.applicationService = new ApplicationService();
        this.userService = new UserService();
    }

    public async createApplication(createApplicationDto: CreateApplicationDto, userId: number): Promise<ApplicationResponse> {
        try {
            const employee = await this.userService.getEmployeeByUserId(userId);
            
            const applicationData = {
                employeeId: employee.id,
                jobOfferId: createApplicationDto.jobOfferId,
                resumeId: createApplicationDto.resumeId,
                coverLetter: createApplicationDto.coverLetter
            };
            
            const application = await this.applicationService.createApplication(applicationData);
            
            return {
                success: true,
                data: application
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            if (error instanceof Error) {
                if (error.message.includes('already exists')) {
                    throw new ConflictError(error.message);
                }
                if (error.message.includes('not found')) {
                    throw new BadRequestError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to create application');
        }
    }

    public async getApplications(queryParams: GetApplicationsQueryDto): Promise<ApplicationResponse> {
        try {
            const page = queryParams.page || 1;
            const limit = queryParams.limit || 10;
            const employeeId = queryParams.employeeId;
            const jobOfferId = queryParams.jobOfferId;

            let result;
            if (employeeId) {
                const applications = await this.applicationService.getApplicationsByEmployeeId(employeeId);
                result = { applications, total: applications.length };
            } else if (jobOfferId) {
                const applications = await this.applicationService.getApplicationsByJobOfferId(jobOfferId);
                result = { applications, total: applications.length };
            } else {
                result = await this.applicationService.getAllApplications(page, limit);
            }
            
            return {
                success: true,
                data: result.applications,
                pagination: {
                    page,
                    limit,
                    total: result.total,
                    pages: Math.ceil(result.total / limit)
                }
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get applications');
        }
    }

    public async getApplicationById(id: number): Promise<ApplicationResponse> {
        try {
            const application = await this.applicationService.getApplicationById(id);
            
            if (!application) {
                throw new NotFoundError('Application not found');
            }

            return {
                success: true,
                data: application
            };
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new InternalServerError('Failed to get application');
        }
    }

    public async updateApplication(id: number, updateApplicationDto: UpdateApplicationDto): Promise<ApplicationResponse> {
        try {
            const application = await this.applicationService.updateApplication(id, updateApplicationDto);
            
            return {
                success: true,
                data: application
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to update application');
        }
    }

    public async deleteApplication(id: number): Promise<ApplicationResponse> {
        try {
            await this.applicationService.deleteApplication(id);
            
            return {
                success: true,
                message: 'Application deleted successfully'
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to delete application');
        }
    }

    public async markApplicationAsSeen(id: number): Promise<ApplicationResponse> {
        try {
            const application = await this.applicationService.markAsSeen(id);
            
            return {
                success: true,
                data: application
            };
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('not found')) {
                    throw new NotFoundError(error.message);
                }
                throw new BadRequestError(error.message);
            }
            throw new InternalServerError('Failed to mark application as seen');
        }
    }

} 