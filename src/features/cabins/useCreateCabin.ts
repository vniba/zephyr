import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import { createCabin } from '../../utils/cabinFn.ts';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabins } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      toast.success('cabin successfully created');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
    },
    onError: error => toast.error((error as Error).message),
  });
  return { isCreating, createCabins };
}
