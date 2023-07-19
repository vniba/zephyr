import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { navItems } from './NavItems.tsx';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-700);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-900);
  }
`;
const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & span {
    @media (max-width: 800px) {
      display: none;
    }
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        {navItems.map(item => (
          <li key={item.label}>
            <StyledNavLink to={item.to} title={item.label}>
              <StyledItem>
                {item.icon}
                <span>{item.label}</span>
              </StyledItem>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
