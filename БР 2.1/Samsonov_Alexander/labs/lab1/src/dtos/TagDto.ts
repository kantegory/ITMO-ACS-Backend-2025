import { Tag } from '../models/Tag';

/**
 * DTO for tag creation
 */
export class CreateTagDto {
  /**
   * The tag name
   * @example "dessert"
   */
  name!: string;
}

/**
 * DTO for tag update
 */
export class UpdateTagDto {
  /**
   * The tag name
   * @example "dessert"
   */
  name!: string;
}

/**
 * DTO for tag response
 */
export class TagResponseDto {
  /**
   * The unique identifier for the tag
   * @example 1
   */
  id!: number;

  /**
   * The tag name
   * @example "dessert"
   */
  name!: string;

  constructor(tag: Tag) {
    this.id = tag.id;
    this.name = tag.name;
  }
}