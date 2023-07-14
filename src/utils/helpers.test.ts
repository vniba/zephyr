import { formatCurrency } from './helpers.ts';
import { expect } from 'vitest';

describe('helpers module', function () {
  it('should format currency in USD base', function () {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
