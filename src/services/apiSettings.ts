import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { Settings } from '../../types/supabase.ts';

export async function settingsApiGet(supabase: SupabaseClient) {
  const { data, error }: PostgrestSingleResponse<Settings> = await supabase
    .from('settings')
    .select('*')
    .single();
  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function settingApiUpdate(
  newSetting: Settings,
  supabase: SupabaseClient,
) {
  const { data, error }: PostgrestSingleResponse<Settings> = await supabase
    .from('settings')
    .update(newSetting)
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
