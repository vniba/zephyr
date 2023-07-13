import { render, screen } from '@testing-library/react';
import Button from './Button.tsx';
import { expect } from 'vitest';

describe('Button component', function () {
  it('should render with correct text => Click', function () {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
  });

  it('should render small & secondary button with correct style ', function () {
    render(
      <Button size='small' variation='secondary'>
        Login
      </Button>,
    );
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toHaveStyleRule('font-size:1.2rem');
    expect(button).toHaveStyleRule(' background: var(--color-grey-0);');
  });

  it('should render large & danger button with correct style ', function () {
    render(
      <Button size='large' variation='danger'>
        Login
      </Button>,
    );
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toHaveStyleRule(' padding: 1.2rem 2.4rem;');
    expect(button).toHaveStyleRule('color: var(--color-red-100)');
    expect(button).toHaveStyleRule('border: none;');
  });
});
