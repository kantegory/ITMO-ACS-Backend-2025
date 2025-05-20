import {
  Get, Post, Patch, Delete, Param, Body, JsonController
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Role } from "../entities/Role";
import { CreateRoleDto } from "../dto/role/create-role.dto";
import { UpdateRoleDto } from "../dto/role/update-role.dto";
import { RoleResponseDto } from "../dto/role/role-response.dto";
import { RoleService } from "../services/roleService";
import { BaseController } from "../common/baseController";

@JsonController("/roles")
export class RoleController extends BaseController<Role> {
  private readonly roleService: RoleService;

  constructor() {
    super(new RoleService());
    this.roleService = this.service as RoleService;
  }

  @Get("/")
  @OpenAPI({ summary: "Get all roles" })
  @ResponseSchema(RoleResponseDto, { isArray: true })
  async getAll() {
    return this.roleService.findAll();
  }

  @Get("/:id")
  @OpenAPI({ summary: "Get role by ID" })
  @ResponseSchema(RoleResponseDto)
  async getById(@Param("id") id: number) {
    const role = await this.roleService.findOne(id);
    if (!role) {
      return { error: "Not found" };
    }
    return role;
  }

  @Post("/")
  @OpenAPI({ summary: "Create a new role" })
  @ResponseSchema(RoleResponseDto)
  async create(@Body({ required: true }) data: CreateRoleDto) {
    return this.roleService.create(data);
  }

  @Patch("/:id")
  @OpenAPI({ summary: "Update a role" })
  @ResponseSchema(RoleResponseDto)
  async update(@Param("id") id: number, @Body({ required: true }) data: UpdateRoleDto) {
    const updated = await this.roleService.update(id, data);
    if (!updated) {
      return { error: "Not found" };
    }
    return updated;
  }

  @Delete("/:id")
  @OpenAPI({ summary: "Delete a role" })
  async remove(@Param("id") id: number) {
    await this.roleService.remove(id);
    return { message: "Deleted successfully" };
  }
}