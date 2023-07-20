import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../utils/settingsFn.ts';
import toast from 'react-hot-toast';
import { SETTINGS_Q_KEY } from '../../utils/constants.ts';

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettings,
    onError: () => toast.error('cannot update settings'),
    onSuccess: async () => {
      toast.success('settings successfully updated');
      await queryClient.invalidateQueries({ queryKey: [SETTINGS_Q_KEY] });
    },
  });
  return { updateSetting, isUpdating };
}
