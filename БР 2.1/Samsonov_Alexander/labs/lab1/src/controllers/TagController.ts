import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags } from 'tsoa';
import { AppDataSource } from '../data-source';
import { Tag } from '../models/Tag';
import { CreateTagDto, TagResponseDto, UpdateTagDto } from '../dtos/TagDto';

@Route('tags')
@Tags('Tags')
export class TagController extends Controller {
  private tagRepository = AppDataSource.getRepository(Tag);

  /**
   * Get all tags
   */
  @Get()
  public async getTags(): Promise<TagResponseDto[]> {
    const tags = await this.tagRepository.find();
    return tags.map(tag => new TagResponseDto(tag));
  }

  /**
   * Get a tag by ID
   */
  @Get('{tagId}')
  public async getTagById(@Path() tagId: number): Promise<TagResponseDto> {
    const tag = await this.tagRepository.findOne({
      where: { id: tagId }
    });

    if (!tag) {
      this.setStatus(404);
      throw new Error('Tag not found');
    }

    return new TagResponseDto(tag);
  }

  /**
   * Create a new tag
   */
  @Post()
  @Security('jwt')
  public async createTag(@Body() requestBody: CreateTagDto): Promise<TagResponseDto> {
    // Check if tag with this name already exists
    const existingTag = await this.tagRepository.findOne({
      where: { name: requestBody.name }
    });

    if (existingTag) {
      this.setStatus(400);
      throw new Error('Tag with this name already exists');
    }

    // Create tag
    const tag = this.tagRepository.create({
      name: requestBody.name
    });

    // Save tag
    await this.tagRepository.save(tag);

    return new TagResponseDto(tag);
  }

  /**
   * Update a tag
   */
  @Put('{tagId}')
  @Security('jwt')
  public async updateTag(
    @Path() tagId: number,
    @Body() requestBody: UpdateTagDto
  ): Promise<TagResponseDto> {
    // Find the tag
    const tag = await this.tagRepository.findOne({
      where: { id: tagId }
    });

    if (!tag) {
      this.setStatus(404);
      throw new Error('Tag not found');
    }

    // Check if tag with this name already exists
    if (requestBody.name !== tag.name) {
      const existingTag = await this.tagRepository.findOne({
        where: { name: requestBody.name }
      });

      if (existingTag) {
        this.setStatus(400);
        throw new Error('Tag with this name already exists');
      }
    }

    // Update tag
    tag.name = requestBody.name;

    // Save updated tag
    await this.tagRepository.save(tag);

    return new TagResponseDto(tag);
  }

  /**
   * Delete a tag
   */
  @Delete('{tagId}')
  @Security('jwt')
  public async deleteTag(@Path() tagId: number): Promise<void> {
    // Find the tag
    const tag = await this.tagRepository.findOne({
      where: { id: tagId },
      relations: ['recipes']
    });

    if (!tag) {
      this.setStatus(404);
      throw new Error('Tag not found');
    }

    // Check if tag is used in any recipes
    if (tag.recipes && tag.recipes.length > 0) {
      this.setStatus(400);
      throw new Error('Cannot delete tag that is used in recipes');
    }

    // Delete the tag
    await this.tagRepository.remove(tag);

    this.setStatus(204);
  }
}