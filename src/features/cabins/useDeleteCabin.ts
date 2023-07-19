import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../utils/cabinFn.ts';
import toast from 'react-hot-toast';
import { CABIN_Q_KEY } from '../../utils/constants.ts';

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: async () => {
      toast.success('successfully deleted');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
    },
    onError: error => toast.error((error as Error).message),
  });
  return { isDeleting, deleteCabin };
}
