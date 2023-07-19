import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../utils/cabinFn.ts';
import toast from 'react-hot-toast';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import { NewCabin } from './CreateCabinForm.tsx';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: NewCabin; id: number }) =>
      createCabin(cabin, id),
    onSuccess: async () => {
      toast.success('cabin successfully created');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
    },
    onError: error => toast.error((error as Error).message),
  });
  return { isEditing, updateCabin };
}
