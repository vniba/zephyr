import { screen } from '@testing-library/react';
import MainNav from './MainNav.tsx';
import { expect, it } from 'vitest';
import { navItems } from './NavItems.tsx';
import { TestRouter } from '../test/testRouter.tsx';

describe('MainNav component', function () {
  it('should render  li tag with length of navItems ', function () {
    TestRouter(<MainNav />);
    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(navItems.length);
  });
  it('should render href with correct path', function () {
    TestRouter(<MainNav />);

    navItems.forEach(item => {
      const linkEl = screen.getByRole('link', { name: item.label });
      expect(linkEl).toHaveAttribute('href', `/${item.to}`);
    });
  });

  it('should render icons with length of navItem', function () {
    const { container } = TestRouter(<MainNav />);
    const svg = container.querySelectorAll('svg');
    expect(svg).toHaveLength(navItems.length);
  });

  it('should match default snapshot', function () {
    const { container } = TestRouter(<MainNav />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
