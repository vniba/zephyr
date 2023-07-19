import styled from 'styled-components';
import { Cabin } from '../../services/apiCabin.ts';
import { formatCurrency } from '../../utils/helpers.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabins } from '../../utils/cabinFn.ts';
import { CABIN_Q_KEY } from '../../utils/constants.ts';
import toast from 'react-hot-toast';
import Button from '../../ui/Button.tsx';
import Row from '../../ui/Row.tsx';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm.tsx';

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
  cabin: Cabin;
}

function CabinRow({ cabin }: CabinRowProps) {
  const { image, regularPrice, discount, name, maxCapacity, id } = cabin;
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: async () => {
      toast.success('successfully deleted');
      await queryClient.invalidateQueries({ queryKey: [CABIN_Q_KEY] });
    },
    onError: error => toast.error((error as Error).message),
  });
  return (
    <>
      <TableRow>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>{maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <Row type='horizontal'>
          <Button
            size='small'
            variation='danger'
            onClick={() => mutate(id)}
            disabled={isDeleting}>
            delete
          </Button>
          <Button
            onClick={() => setShowForm(prevState => !prevState)}
            variation='secondary'
            size='small'>
            Edit
          </Button>
        </Row>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
