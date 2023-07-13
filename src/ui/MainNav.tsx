import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { HiHome, HiMiniHomeModern, HiUsers } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import {
  BOOKINGS,
  CABINS,
  DASHBOARD,
  SETTINGS,
  USERS,
} from '../utils/constants.ts';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

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

const navItems = [
  {
    to: DASHBOARD,
    icon: <HiHome />,
    label: 'Home',
  },
  {
    to: BOOKINGS,
    icon: <FaCalendarAlt />,
    label: 'Bookings',
  },
  {
    to: CABINS,
    icon: <HiMiniHomeModern />,
    label: 'Cabins',
  },
  {
    to: USERS,
    icon: <HiUsers />,
    label: 'Users',
  },
  {
    to: SETTINGS,
    icon: <MdSettings />,
    label: 'Settings',
  },
];
function MainNav() {
  return (
    <nav>
      <NavList>
        {navItems.map(item => (
          <li>
            <StyledNavLink to={item.to}>
              {item.icon}
              <span>{item.label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
