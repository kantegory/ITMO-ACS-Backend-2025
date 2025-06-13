import { ApplicationStatus } from "@prisma/client";
export declare class CreateApplicationsDto {
    message?: string;
    status?: ApplicationStatus;
    user_id: number;
    vacancy_id: number;
}
export type TUpdateApplicationsDto = Partial<CreateApplicationsDto>;
