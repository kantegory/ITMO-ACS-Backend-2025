import {Body, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags} from 'tsoa';
import { BaseCrudController } from './base-controller';
import { CompanyService } from '../services/company';
import { Company } from '../models/Company';

@Route('companies')
@Tags('Company')
export class CompanyController extends BaseCrudController<Company> {
  protected service = new CompanyService();

  @Get()
  public async list(): Promise<Company[]> {
    return super.list();
  }

  @Get('{id}')
  public async detail(@Path() id: string): Promise<Company> {
    return super.detail(id);
  }

  @Post()
  @SuccessResponse('201')
  public async create(@Body() dto: Partial<Company>): Promise<Company> {
    return super.create(dto);
  }

  @Put('{id}')
  public async update(
      @Path() id: string,
      @Body() dto: Partial<Company>
  ): Promise<Company> {
    return super.update(id, dto);
  }

  @Delete('{id}')
  @SuccessResponse('204')
  public async delete(@Path() id: string): Promise<void> {
    return super.delete(id);
  }
}
