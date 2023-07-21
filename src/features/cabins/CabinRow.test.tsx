import { screen } from '@testing-library/react';
import CabinRow from './CabinRow.tsx';
import { expect, Mock, vi } from 'vitest';
import { TestRouter } from '../../test/testRouter.tsx';
import { useDeleteCabin } from './useDeleteCabin.ts';
import userEvent from '@testing-library/user-event';
import { useCreateCabin } from './useCreateCabin.ts';

const dummyCabin = [
  {
    id: 1,
    name: '008',
    description: 'A charming cabin in the woods.',
    image: 'https://example.com/cozy-cabin.jpg',
    maxCapacity: 4,
    regularPrice: 150,
    discount: 20,
    created_at: '2023-07-19T12:34:56Z',
  },
];
const cabin = dummyCabin[0];
vi.mock('./useDeleteCabin', () => ({
  useDeleteCabin: vi.fn(),
}));
vi.mock('./useCreateCabin', () => ({ useCreateCabin: vi.fn() }));

function mockHookFn() {
  (useDeleteCabin as Mock).mockReturnValue({
    isDeleting: false,
    deleteCabin: vi.fn(),
  })();
  (useCreateCabin as Mock).mockReturnValue({
    isCreating: false,
    createCabins: vi.fn(),
  })();
}
describe('cabinRow component', function () {
  it('should render 3 buttons', function () {
    mockHookFn();
    TestRouter(<CabinRow cabin={cabin} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
  it('should have correct image url and alt ', function () {
    mockHookFn();
    TestRouter(<CabinRow cabin={cabin} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', cabin.image);
    expect(img).toHaveAttribute('alt', cabin.name);
  });

  it('should call deleteCabin when delete button clicked', async function () {
    mockHookFn();
    const { container } = TestRouter(<CabinRow cabin={cabin} />);
    const button = container.querySelector('Button[variation="danger"]');
    expect(button).toBeInTheDocument();
    if (button) await userEvent.click(button);
    expect(useDeleteCabin().deleteCabin).toHaveBeenCalledTimes(1);
    expect(useDeleteCabin().deleteCabin).toHaveBeenCalledWith(cabin.id);
  });
});
