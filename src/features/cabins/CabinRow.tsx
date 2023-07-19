import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers.ts';
import Button from '../../ui/Button.tsx';
import Row from '../../ui/Row.tsx';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm.tsx';
import { useDeleteCabin } from './useDeleteCabin.ts';
import { Cabins } from '../../../types/supabase.ts';
import { MdDelete, MdEdit, MdFileCopy } from 'react-icons/md';
import { useCreateCabins } from './useCreateCabin.ts';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr 1.8fr 1fr 1fr 1fr;
  column-gap: 2.3rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  font-size: 0.5rem;
  width: clamp(10rem, 13rem, 15rem);
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  margin: 1rem 0;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono', serif;
`;

const Price = styled.div`
  font-family: 'Sono', serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono', serif;
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: Cabins;
}

function CabinRow({ cabin }: CabinRowProps) {
  const { image, regularPrice, discount, name, maxCapacity, id, description } =
    cabin;
  const [showForm, setShowForm] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabins, isCreating } = useCreateCabins();
  function handleDuplicate() {
    createCabins({
      name: `C-${name || ''}`,
      maxCapacity,
      discount,
      regularPrice,
      description,
      image,
    });
  }
  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(+regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(+discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Row type='horizontal'>
          <Button
            disabled={isCreating}
            onClick={handleDuplicate}
            variation='secondary'
            size='small'>
            <MdFileCopy />
          </Button>
          <Button
            size='small'
            variation='danger'
            onClick={() => deleteCabin(id)}
            disabled={isDeleting}>
            <MdDelete />
          </Button>
          <Button
            onClick={() => setShowForm(prevState => !prevState)}
            variation='secondary'
            size='small'>
            <MdEdit />
          </Button>
        </Row>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
