import { screen } from '@testing-library/react';
import CabinRow from './CabinRow.tsx';
import { expect } from 'vitest';
import { TestRouter } from '../../test/testRouter.tsx';

const dummyCabin = [
  {
    id: 1,
    name: 'Cozy Cabin',
    description: 'A charming cabin in the woods.',
    image: 'https://example.com/cozy-cabin.jpg',
    maxCapacity: 4,
    regularPrice: 150,
    discount: 20,
    created_at: '2023-07-19T12:34:56Z',
  },
];
const cabin = dummyCabin[0];
describe('cabinRow component', function () {
  it('should render 3 buttons', function () {
    TestRouter(<CabinRow cabin={cabin} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
  it('should have correct image url and alt ', function () {
    TestRouter(<CabinRow cabin={cabin} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', cabin.image);
    expect(img).toHaveAttribute('alt', cabin.name);
  });
});
