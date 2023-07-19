import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../../utils/cabinFn.ts';
import toast from 'react-hot-toast';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import { Cabin } from '../../services/apiCabin.ts';

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: updateCabins } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: Cabin; id: number }) =>
      updateCabin(cabin, id),
    onSuccess: async () => {
      toast.success('cabin successfully created');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
    },
    onError: error => toast.error((error as Error).message),
  });
  return { isEditing, updateCabins };
}
