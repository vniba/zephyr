import { useQuery } from '@tanstack/react-query';
import { SETTINGS_Q_KEY } from '../../utils/constants.ts';
import { getSettings } from '../../utils/settingsFn.ts';

export function useSettings() {
  const {
    error,
    data: settings,
    isLoading,
  } = useQuery({
    queryKey: [SETTINGS_Q_KEY],
    queryFn: getSettings,
  });
  return { error, settings, isLoading };
}
