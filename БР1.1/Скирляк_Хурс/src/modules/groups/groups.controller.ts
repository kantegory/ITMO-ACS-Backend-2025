import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
  CreateGroupDto,
  UpdateGroupDto,
  AddUserToGroupDto,
} from './dto/group.dto';

import { Group } from '../../entities/group.entity';

@ApiTags('groups')
@Controller('groups')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'Group created successfully.',
    type: Group,
  })
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({
    status: 200,
    description: 'Returns all groups.',
    type: [Group],
  })
  async findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group by ID' })
  @ApiResponse({ status: 200, description: 'Returns the group.', type: Group })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update group' })
  @ApiResponse({
    status: 200,
    description: 'Group updated successfully.',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group' })
  @ApiResponse({ status: 200, description: 'Group deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Group not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupsService.remove(id);
  }

  @Post('users/add')
  @ApiOperation({ summary: 'Add user to group' })
  @ApiResponse({
    status: 200,
    description: 'User added to group successfully.',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Group or user not found.' })
  async addUser(@Body() addUserDto: AddUserToGroupDto): Promise<Group> {
    return this.groupsService.addUser(addUserDto.groupId, addUserDto.userId);
  }

  @Post('users/remove')
  @ApiOperation({ summary: 'Remove user from group' })
  @ApiResponse({
    status: 200,
    description: 'User removed from group successfully.',
    type: Group,
  })
  @ApiResponse({ status: 404, description: 'Group or user not found.' })
  async removeUser(@Body() addUserDto: AddUserToGroupDto): Promise<Group> {
    return this.groupsService.removeUser(addUserDto.groupId, addUserDto.userId);
  }
}
