import { IsInt, IsUrl, IsString, IsOptional } from 'class-validator';

export class CreatePhotoDto {
    @IsInt()
    property_id!: number;

    @IsUrl()
    photo_url!: string;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdatePhotoDto {
    @IsOptional()
    @IsUrl()
    photo_url?: string;

    @IsOptional()
    @IsString()
    description?: string;
}