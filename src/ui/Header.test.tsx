import { render, screen } from '@testing-library/react';
import Header from './Header.tsx';
import { expect } from 'vitest';

describe('render Header component', function () {
  it('should have text of header', function () {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
