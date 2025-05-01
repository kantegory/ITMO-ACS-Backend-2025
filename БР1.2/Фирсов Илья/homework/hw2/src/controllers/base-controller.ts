import {
    Get,
    Post,
    Put,
    Delete,
    Path,
    Body,
    SuccessResponse, Controller,
} from 'tsoa';
import { BaseService } from '../services/base';
import {DeepPartial, ObjectLiteral} from "typeorm";


export abstract class BaseCrudController<T extends ObjectLiteral> extends Controller {

    protected abstract service: BaseService<T>;

    @Get()
    public async list(): Promise<T[]> {
        return this.service.list();
    }

    @Get('{id}')
    public async detail(@Path() id: string): Promise<T> {
        return this.service.getById(id);
    }

    @Post()
    @SuccessResponse('201')
    public async create(@Body() dto: DeepPartial<T>): Promise<T> {
        return this.service.create(dto);
    }

    @Put('{id}')
    public async update(
        @Path() id: string,
        @Body() dto: Partial<T>,
    ): Promise<T> {
        return this.service.update(id, dto);
    }

    @Delete('{id}')
    @SuccessResponse('204')
    public async delete(@Path() id: string): Promise<void> {
        await this.service.delete(id);
    }
}