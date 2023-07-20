import { settingApiUpdate, settingsApiGet } from '../services/apiSettings.ts';
import supabase from '../services/supabase.ts';
import { Settings } from '../../types/supabase.ts';

export async function getSettings() {
  return settingsApiGet(supabase);
}
export async function updateSettings(newSettings: Settings) {
  return settingApiUpdate(newSettings, supabase);
}
