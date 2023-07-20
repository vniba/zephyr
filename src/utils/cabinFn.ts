import {
  Cabin,
  cabinAPICreate,
  cabinAPIDelete,
  cabinAPIGet,
  cabinAPIUpdate,
  INewCabin,
} from '../services/apiCabin.ts';
import supabase from '../services/supabase.ts';

export async function getCabins() {
  return cabinAPIGet(supabase);
}
export async function deleteCabins(id: number) {
  return cabinAPIDelete(supabase, id);
}

export async function createCabin(cabin: INewCabin) {
  return cabinAPICreate(supabase, cabin);
}

export async function updateCabin(cabin: Cabin, id: number) {
  return cabinAPIUpdate(supabase, cabin, id);
}
