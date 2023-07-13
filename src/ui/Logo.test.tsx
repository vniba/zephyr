import { render, screen } from '@testing-library/react';
import Logo from './Logo.tsx';
import { expect } from 'vitest';

describe('logo component', function () {
  it('should render img tag with logo', function () {
    render(<Logo />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it('should show correct styles', function () {
    const { container } = render(<Logo />);
    expect(container.firstChild).toHaveStyleRule('height:9.6rem');
  });

  it('should  match default Logo snapshot ', function () {
    const logo = render(<Logo />);
    expect(logo).toMatchSnapshot();
  });
});
