import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
import { Cabins } from '../../types/supabase.ts';
import { createImageName } from '../utils/helpers.ts';
import supabase from './supabase.ts';

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
function getImagePath(cabin: Cabin, path: string, name: string) {
  if (typeof cabin.image === 'string') return cabin.image;
  return `${path}/storage/v1/object/public/cabins-images/${name}`;
}

async function uploadImage(newCabin: Cabin, imageName: string, id: number) {
  const { error } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, newCabin.image);
  if (error) {
    await supabase.from('cabins').delete().eq('id', id);

    throw new Error('error when uploading image or file is too large');
  }
  return error;
}

export async function cabinAPICreate(supabase: SupabaseClient, cabin: Cabin) {
  const path = import.meta.env.VITE_SUPABASE_URL as string;

  let newCabin;
  let imagePath;
  let imageName;
  if (typeof cabin.image !== 'string') {
    imageName = createImageName(cabin.image.name);
    imagePath = getImagePath(cabin, path, imageName);
    newCabin = {
      ...cabin,
      image: imagePath,
    };
  }

  if (typeof cabin.image === 'string') {
    newCabin = {
      ...cabin,
    };
  }

  const { data, error }: PostgrestSingleResponse<Cabins[]> = await supabase
    .from('cabins')
    .insert({ ...newCabin })
    .select();
  if (error) {
    throw new Error('cabin could not be created');
  }
  if (newCabin && imageName) await uploadImage(newCabin, imageName, data[0].id);
  return data;
}

export async function cabinAPIUpdate(
  supabase: SupabaseClient,
  updatedCabin: Cabin,
  id: number,
) {
  const path = import.meta.env.VITE_SUPABASE_URL as string;
  const isImageName = typeof updatedCabin.image === 'string';
  let imageName;
  let imagePath;
  if (!isImageName) {
    imageName = createImageName((updatedCabin.image as File).name);
    imagePath = getImagePath(updatedCabin, path, imageName);
  }

  const { data, error } = await supabase
    .from('cabins')
    .update({ ...updatedCabin, image: imagePath })
    .eq('id', id);
  if (error) throw new Error('cabin cannot be updated');
  if (!isImageName) {
    if (imageName) await uploadImage(updatedCabin, imageName, id);
  }
  return data;
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
