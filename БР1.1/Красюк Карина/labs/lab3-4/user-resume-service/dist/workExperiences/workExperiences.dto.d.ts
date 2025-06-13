export declare class CreateWorkExperiencesDto {
    company_name: string;
    position: string;
    start_date: Date;
    end_date?: Date;
    description?: string;
    resume_id: number;
}
export type TUpdateWorkExperiencesDto = Partial<CreateWorkExperiencesDto>;
