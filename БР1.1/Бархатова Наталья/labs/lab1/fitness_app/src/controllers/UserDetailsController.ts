import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  UseBefore
} from "routing-controllers";
import { AppDataSource } from "../AppDataSource";
import { UserDetails } from "../models/UserDetails";
import { AuthMiddleware } from '../middlewares/AuthMiddleware';


const userDetailsRepo = AppDataSource.getRepository(UserDetails);

@JsonController("/userDetails")
@UseBefore(AuthMiddleware)
export class UserDetailsController {
  @Post()
  @HttpCode(201)
  async create(@Body() userDetailsData: any) {
    const userDetails = userDetailsRepo.create(userDetailsData);
    return await userDetailsRepo.save(userDetails);
  }

  @Get()
  async getAll() {
    return await userDetailsRepo.find();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string) {
    const userDetails = await userDetailsRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!userDetails) {
      return { status: 404, message: "User details not found" };
    }

    return userDetails;
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: any) {
    const userDetails = await userDetailsRepo.findOne({ where: { id } });
    if (!userDetails) {
      return { status: 404, message: "User details not found" };
    }

    userDetailsRepo.merge(userDetails, data);
    return await userDetailsRepo.save(userDetails);
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const result = await userDetailsRepo.delete(id);
    if (result.affected === 0) {
      return { status: 404, message: "User details not found" };
    }

    return { message: "User details deleted successfully" };
  }
}