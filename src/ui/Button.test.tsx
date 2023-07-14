import { render, screen } from '@testing-library/react';
import Button from './Button.tsx';
import { expect } from 'vitest';

describe('Button component', function () {
  it('should render with correct text => Click', function () {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
  });
  it('should render correct style => danger && large', function () {
    const { container } = render(
      <Button variation='danger' size='large'>
        hello
      </Button>,
    );
    expect(container.firstChild).toHaveStyleRule('font-size', '1.6rem');
  });
  it('should render correct style => secondary', function () {
    const { container } = render(<Button variation='secondary'>hello</Button>);
    expect(container.firstChild).toHaveStyleRule(
      'color',
      'var(--color-grey-600)',
    );
  });

  it('should matches default button snapshot', function () {
    const { container } = render(<Button>test</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
