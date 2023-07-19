import {
  cabinAPICreateAndEdit,
  cabinAPIDelete,
  cabinAPIGet,
} from '../services/apiCabin.ts';
import supabase from '../services/supabase.ts';
import { NewCabin } from '../features/cabins/CreateCabinForm.tsx';

export async function getCabins() {
  return cabinAPIGet(supabase);
}
export async function deleteCabins(id: number) {
  return cabinAPIDelete(supabase, id);
}

export async function createCabin(cabin: NewCabin, id?: number) {
  return cabinAPICreateAndEdit(supabase, cabin, id);
}
