import { cabinAPI } from '../services/apiCabin.ts';
import supabase from '../services/supabase.ts';
export async function getCabins() {
  return cabinAPI(supabase);
}
