import {IsInt, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateBlogPostDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 256)
    title: string;

    @IsString()
    content: string;

    @IsNotEmpty()
    @IsInt()
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