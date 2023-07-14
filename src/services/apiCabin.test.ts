import { expect, vi } from 'vitest';
import { getCabins } from './apiCabin.ts';
import { SupabaseClient } from '@supabase/supabase-js';

const cab = [
  {
    id: 1,
    created_at: '2022-01-01T00:00:00.000Z',
    name: '001',
    maxCapacity: 2,
    regularPrice: 250,
    discount: 10,
    description:
      'Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.',
    image: 'https://example.com/cabin-001.jpg',
  },
];

describe('apiCabin module', function () {
  it('should return cab', async function () {
    const mockSupbaseClent: SupabaseClient = {
      supabaseKey: 'none',
      supabaseUrl: 'url',
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockResolvedValue({ data: cab, error: null }),
      }),
    };
    const cabins = await getCabins(mockSupbaseClent);
    expect(cabins).toBeTypeOf('object');
    expect(cabins.some(cabin => cabin.name === '001')).toBeTruthy();
  });
});
