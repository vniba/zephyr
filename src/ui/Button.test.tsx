import { render, screen } from '@testing-library/react';
import Button from './Button.tsx';
import { expect } from 'vitest';

describe('Button component', function () {
  it('should render with correct text => Click', function () {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
  });

  it('should matches default button snapshot', function () {
    const { container } = render(<Button>test</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
