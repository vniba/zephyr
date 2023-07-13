import styled from 'styled-components';
import Logo from './Logo.tsx';
import MainNav from './MainNav.tsx';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2rem 4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function SideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default SideBar;
