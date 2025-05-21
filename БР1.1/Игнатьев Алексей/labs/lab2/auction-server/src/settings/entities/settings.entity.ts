import { Settings } from '@prisma/client';

export class SettingsEntity implements Settings {
  settings_id: number;
  cost_per_spin: number;
}
