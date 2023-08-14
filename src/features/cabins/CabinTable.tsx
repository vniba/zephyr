import Spinner from '../../ui/Spinner.tsx';
import CabinRow from './CabinRow.tsx';
import { useCabins } from './useCabins.ts';
import Table from '../../ui/Table.tsx';
import { Cabins } from '../../../types/supabase.ts';
import Menus from '../../ui/Menus.tsx';
import { useSearchParams } from 'react-router-dom';
import { filterCabinWithDiscount } from '../../utils/helpers.ts';

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue: string = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (cabins) {
    filteredCabins = filterCabinWithDiscount(cabins, filterValue);
  }
  if (isLoading) return <Spinner />;
  if (error) return false;
  return (
    <Menus>
      <Table columns={'3fr 1.5fr 1.8fr 1fr 1fr 1fr'}>
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin: Cabins) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
