import { Category } from '../models/Category'

export interface CategoryDto {
  id: number
  name: string
}

export interface ExtraCategoryDto extends CategoryDto{
  channels?: string[]
}

export function toCategoryDto(category: Category): ExtraCategoryDto {
  return {
    id: category.id,
    name: category.name,
    channels: category.channels?.map(channel => channel.id),
  }
}