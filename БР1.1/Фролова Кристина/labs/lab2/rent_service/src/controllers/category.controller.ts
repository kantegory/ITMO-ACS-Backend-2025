import {Body, Controller, Delete, Get, Path, Post, Put, Response, Route, Security, SuccessResponse, Tags} from "tsoa";
import {EntityNotFoundError} from "../models/errors/entity-not-found.model";
import {Category} from "../models/models/category.model";
import categoryService from "../services/category.service";
import {CategoryResponseDto} from "../models/responses/category-response.dto";
import {createRequestToCreateData, toCategoryResponseModel, updateRequestToCategory} from "../mappers/category.mapper";
import {CreateCategoryRequestDto} from "../models/requests/category/category-create-request.dto";
import {UpdateCategoryRequestDto} from "../models/requests/category/category-update-request.dto";

@Route("categories")
@Tags("Category")
export class CategoryController extends Controller {

    @Get()
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getCategories(): Promise<CategoryResponseDto[]> {
        const categories: Category[] = await categoryService.getAll();
        return categories.map(toCategoryResponseModel)
    }

    @Post()
    @SuccessResponse("201", "Created")
    public async createCategory(@Body() createRequest: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
        const category = await categoryService.create(createRequestToCreateData(createRequest));
        return toCategoryResponseModel(category);
    }

    @Get("{categoryId}")
    @SuccessResponse("200", "Ok")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async getCategoryById(@Path() categoryId: number): Promise<CategoryResponseDto> {
        const category = await categoryService.getById(categoryId);
        return toCategoryResponseModel(category);
    }

    @Put("{categoryId}")
    @SuccessResponse("200", "Updated")
    @Security("jwt")
    @Response<EntityNotFoundError>(404, "Entity not found")
    public async updateCategory(
        @Path() categoryId: number,
        @Body() body: UpdateCategoryRequestDto
    ): Promise<CategoryResponseDto> {
        const updated = await categoryService.update(categoryId, updateRequestToCategory(body));
        return toCategoryResponseModel(updated);
    }

    @Delete("{categoryId}")
    @SuccessResponse("204", "Deleted")
    @Security("jwt")
    public async deleteCategory(@Path() categoryId: number): Promise<void> {
        await categoryService.delete(categoryId);
    }
}