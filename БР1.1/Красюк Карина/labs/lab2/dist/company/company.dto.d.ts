export declare class CreateCompanysDto {
    name: string;
    description?: string;
    website?: string;
    user_id: number;
    industry_id?: number;
}
export type TUpdateCompanysDto = Partial<CreateCompanysDto>;
