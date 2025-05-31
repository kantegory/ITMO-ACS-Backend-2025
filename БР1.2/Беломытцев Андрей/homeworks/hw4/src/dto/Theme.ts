import { Theme } from '../models/Theme'

export interface ThemeDto {
  id: number
  name: string
}

export interface ExtraThemeDto extends ThemeDto{
  channels?: string[]
}

export function toThemeDto(theme: Theme): ExtraThemeDto {
  return {
    id: theme.id,
    name: theme.name,
    channels: theme.channels?.map(channel => channel.id),
  }
}