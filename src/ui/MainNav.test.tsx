import { render, screen } from '@testing-library/react';
import MainNav from './MainNav.tsx';
import { expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { navItems } from './NavItems.tsx';

describe('MainNav component', function () {
  it('should render  li tag with length of navItems ', function () {
    render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>,
    );
    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(navItems.length);
  });
  it('should render href with correct path', function () {
    render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>,
    );

    navItems.forEach(item => {
      const linkEl = screen.getByRole('link', { name: item.label });
      expect(linkEl).toHaveAttribute('href', `/${item.to}`);
    });
  });

  it('should render icons with length of navItem', function () {
    const { container } = render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>,
    );
    const svg = container.querySelectorAll('svg');
    expect(svg).toHaveLength(navItems.length);
  });

  it('should match default snapshot', function () {
    const { container } = render(
      <BrowserRouter>
        <MainNav />
      </BrowserRouter>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
