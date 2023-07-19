import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { NewCabin } from '../features/cabins/CreateCabinForm.tsx';
import { Cabins } from '../../types/supabase.ts';

export interface Cabin {
  description: string;
  discount: number;
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}
export async function cabinAPIGet(supabase: SupabaseClient): Promise<Cabins[]> {
  const { data, error }: PostgrestSingleResponse<Cabins[]> = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function cabinAPICreateAndEdit(
  supabase: SupabaseClient,
  cabin: NewCabin,
  id?: number,
) {
  const hasImagePath = typeof cabin.image === 'string';
  const newCabin: Cabin = {
    ...cabin,
    image: typeof cabin.image === 'string' ? cabin.image : cabin.image[0],
  };
  console.log(newCabin);
  const path = import.meta.env.VITE_SUPABASE_URL as string;
  let imageName;
  let imagePath;
  if (!hasImagePath) {
    imageName = `${Math.random()}-${(newCabin.image as File).name.replaceAll(
      '/',
      '-',
    )}`;
    imagePath = hasImagePath
      ? newCabin.image
      : `${path}/storage/v1/object/public/cabins-images/${imageName}`;
  }
  let datas;
  // inserting data
  if (!id) {
    const { data, error }: PostgrestSingleResponse<Cabins[]> = await supabase
      .from('cabins')
      .insert({ ...newCabin, image: imagePath ? imagePath : newCabin.image })
      .select();
    if (error) {
      console.error(error, 'creating cabin');
      throw new Error('cabin could not be created');
    }
    datas = data;
  }
  if (id) {
    const { error } = await supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);
    if (error) throw new Error('cabin cannot be updated');
  }

  // uploading image
  if (hasImagePath) return datas;
  if (imageName) {
    const { error: imageError } = await supabase.storage
      .from('cabins-images')
      .upload(imageName, newCabin.image);
    if (imageError) {
      if (datas) {
        await supabase
          .from('cabins')
          .delete()
          .eq('id', datas[0]?.id);
      }
      throw new Error('error when uploading image or file is too large');
    }
  }
}

export async function cabinAPIDelete(
  supabase: SupabaseClient,
  id: number,
): Promise<Cabins[] | null> {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    throw new Error('cabin cannot be deleted');
  }

  return data;
}
