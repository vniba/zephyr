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
  const imageName = `${Math.random()}-${cabin.image.name.replaceAll('/', '-')}`;
  const path = import.meta.env.VITE_SUPABASE_URL as string;
  const imagePath = `${path}/storage/v1/object/public/cabins-images/${imageName}`;

  // inserting data
  const { data, error }: PostgrestSingleResponse<Cabin[]> = await supabase
    .from('cabins')
    .insert({ ...cabin, image: imagePath })
    .select();
  console.log(data, 'data');
  if (error) {
    throw new Error('cabin could not be created');
  }

  // uploading image
  const { error: imageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, cabin.image);
  if (imageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    throw new Error('error when uploading image or file is too large');
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
