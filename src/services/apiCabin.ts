import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { NewCabin } from '../features/cabins/CreateCabinForm.tsx';

export interface Cabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

export async function cabinAPIGet(supabase: SupabaseClient): Promise<Cabin[]> {
  const { data, error }: PostgrestSingleResponse<Cabin[]> = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function cabinAPICreate(
  supabase: SupabaseClient,
  cabin: NewCabin,
) {
  const { data, error }: PostgrestSingleResponse<Cabin[]> = await supabase
    .from('cabins')
    .insert(cabin)
    .select();

  if (error) {
    console.error(error);
    throw new Error('cabin could not be created');
  }
  return data;
}

export async function cabinAPIDelete(
  supabase: SupabaseClient,
  id: number,
): Promise<Cabin[] | null> {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('cabin cannot be deleted');
  }

  return data;
}
