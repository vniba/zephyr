import { useQuery } from '@tanstack/react-query';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import { getCabins } from '../../utils/cabinFn.ts';

export function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: [CABIN_Q_KEY],
    queryFn: getCabins,
  });
  return { cabins, error, isLoading };
}
