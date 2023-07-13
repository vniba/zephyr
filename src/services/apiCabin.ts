import { PostgrestSingleResponse } from '@supabase/supabase-js';
import supabase from './supabase.ts';
interface Cabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | null;
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error }: PostgrestSingleResponse<Cabin[]> = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
