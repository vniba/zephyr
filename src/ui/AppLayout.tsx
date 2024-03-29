import { Outlet } from 'react-router-dom';
import SideBar from './SideBar.tsx';
import Header from './Header.tsx';
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 28rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  @media (max-width: 800px) {
    grid-template-columns: 8rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-0);
  padding: 4rem 5rem 7rem 3rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
