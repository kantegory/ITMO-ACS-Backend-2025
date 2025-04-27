import { Recipe, RecipeContentBlock, Ingredient } from '../models/Recipe';
import { UserResponseDto } from './UserDto';
import { TagResponseDto } from './TagDto';

/**
 * DTO for recipe creation
 */
export class CreateRecipeDto {
  /**
   * The recipe title
   * @example "Delicious Chocolate Cake"
   */
  title!: string;

  /**
   * The recipe description
   * @example "A rich and moist chocolate cake that's perfect for any occasion."
   */
  description!: string;

  /**
   * The recipe ingredients
   * @example [{"name": "flour", "quantity": "2 cups"}, {"name": "sugar", "quantity": "1 cup"}]
   */
  ingredients!: Ingredient[];

  /**
   * The recipe content blocks
   * @example [{"type": "text", "content": "Mix all dry ingredients."}, {"type": "image", "url": "https://example.com/image.jpg", "alt": "Mixing bowl"}]
   */
  content!: RecipeContentBlock[];

  /**
   * The IDs of tags to associate with the recipe
   * @example [1, 2]
   */
  tagIds!: number[];
}

/**
 * DTO for recipe update
 */
export class UpdateRecipeDto {
  /**
   * The recipe title
   * @example "Delicious Chocolate Cake"
   */
  title?: string;

  /**
   * The recipe description
   * @example "A rich and moist chocolate cake that's perfect for any occasion."
   */
  description?: string;

  /**
   * The recipe ingredients
   * @example [{"name": "flour", "quantity": "2 cups"}, {"name": "sugar", "quantity": "1 cup"}]
   */
  ingredients?: Ingredient[];

  /**
   * The recipe content blocks
   * @example [{"type": "text", "content": "Mix all dry ingredients."}, {"type": "image", "url": "https://example.com/image.jpg", "alt": "Mixing bowl"}]
   */
  content?: RecipeContentBlock[];

  /**
   * The IDs of tags to associate with the recipe
   * @example [1, 2]
   */
  tagIds?: number[];
}

/**
 * DTO for recipe response
 */
export class RecipeResponseDto {
  /**
   * The unique identifier for the recipe
   * @example 1
   */
  id!: number;

  /**
   * The recipe title
   * @example "Delicious Chocolate Cake"
   */
  title!: string;

  /**
   * The recipe description
   * @example "A rich and moist chocolate cake that's perfect for any occasion."
   */
  description!: string;

  /**
   * The recipe ingredients
   * @example [{"name": "flour", "quantity": "2 cups"}, {"name": "sugar", "quantity": "1 cup"}]
   */
  ingredients!: Ingredient[];

  /**
   * The recipe content blocks
   * @example [{"type": "text", "content": "Mix all dry ingredients."}, {"type": "image", "url": "https://example.com/image.jpg", "alt": "Mixing bowl"}]
   */
  content!: RecipeContentBlock[];

  /**
   * The recipe author
   */
  author!: UserResponseDto;

  /**
   * The recipe tags
   */
  tags!: TagResponseDto[];

  /**
   * The number of likes the recipe has
   * @example 42
   */
  likesCount!: number;

  /**
   * The number of comments the recipe has
   * @example 10
   */
  commentsCount!: number;

  /**
   * The date the recipe was created
   */
  createdAt!: Date;

  /**
   * The date the recipe was last updated
   */
  updatedAt!: Date;

  constructor(recipe: Recipe) {
    this.id = recipe.id;
    this.title = recipe.title;
    this.description = recipe.description;
    this.ingredients = recipe.ingredients;
    this.content = recipe.content;
    this.author = new UserResponseDto(recipe.author);
    this.tags = recipe.tags.map(tag => new TagResponseDto(tag));
    this.likesCount = recipe.likes ? recipe.likes.length : 0;
    this.commentsCount = recipe.comments ? recipe.comments.length : 0;
    this.createdAt = recipe.createdAt;
    this.updatedAt = recipe.updatedAt;
  }
}