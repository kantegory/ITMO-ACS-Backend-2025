import {IsInt, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";
import {Type} from "class-transformer";

export class CreateBlogPostDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 256)
    title: string;

    @IsString()
    content: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    authorId: number;
}

export class UpdateBlogPostDto {
    @IsOptional()
    @IsString()
    @Length(1, 256)
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;
}