import TableOperations from '../../ui/TableOperations.tsx';
import Filter from '../../ui/Filter.tsx';

function CabinTableOps() {
  return (
    <TableOperations>
      <Filter
        filterField='discount'
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOps;
