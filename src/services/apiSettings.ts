import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { Settings } from '../../types/supabase.ts';

export async function settingsApiGet(supabase: SupabaseClient) {
  const { data, error }: PostgrestSingleResponse<Settings> = await supabase
    .from('settings')
    .select('*')
    .single();
  console.log(data);
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
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
