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
export interface INewCabin {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
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

export async function cabinAPICreate(
  supabase: SupabaseClient,
  cabin: INewCabin,
) {
  const path = import.meta.env.VITE_SUPABASE_URL as string;
  const imageName = createImageName(cabin.image.name);
  const imagePath = getImagePath(cabin, path, imageName);

  const newCabin: Cabin = {
    ...cabin,
    image: imagePath,
  };

  const { data, error }: PostgrestSingleResponse<Cabins[]> = await supabase
    .from('cabins')
    .insert({ ...newCabin, image: imagePath })
    .select();
  if (error) {
    throw new Error('cabin could not be created');
  }
  await uploadImage(newCabin, imageName, data[0].id);
  return data;
}

export async function cabinAPIUpdate(
  supabase: SupabaseClient,
  updatedCabin: Cabin,
  id: number,
) {
  const path = import.meta.env.VITE_SUPABASE_URL as string;
  const isImageName = typeof updatedCabin.image === 'string';
  const imageName = createImageName((updatedCabin.image as File).name);
  let imagePath;
  if (!isImageName) imagePath = getImagePath(updatedCabin, path, imageName);
  const { data, error } = await supabase
    .from('cabins')
    .update({ ...updatedCabin, image: imagePath })
    .eq('id', id);
  if (error) throw new Error('cabin cannot be updated');
  if (!isImageName) {
    await uploadImage(updatedCabin, imageName, id);
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
