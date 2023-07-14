import { cabinAPIDelete, cabinAPIGet } from '../services/apiCabin.ts';
import supabase from '../services/supabase.ts';

export async function getCabins() {
  return cabinAPIGet(supabase);
}
export async function deleteCabins(id: number) {
  return cabinAPIDelete(supabase, id);
}
