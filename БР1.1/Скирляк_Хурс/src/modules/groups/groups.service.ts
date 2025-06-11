import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';

import { Group } from '../../entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find({
      relations: ['users'],
    });
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    this.groupRepository.merge(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async remove(id: string): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepository.remove(group);
  }

  async addUser(groupId: string, userId: string): Promise<Group> {
    const group = await this.findOne(groupId);
    group.users = [...(group.users || []), { id: userId } as any];
    return this.groupRepository.save(group);
  }

  async removeUser(groupId: string, userId: string): Promise<Group> {
    const group = await this.findOne(groupId);
    group.users = group.users.filter(user => user.id !== userId);
    return this.groupRepository.save(group);
  }
}
