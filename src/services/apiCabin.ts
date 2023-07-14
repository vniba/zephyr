import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

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

export async function cabinAPI(supabase: SupabaseClient): Promise<Cabin[]> {
  const { data, error }: PostgrestSingleResponse<Cabin[]> = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
