import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 3rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <StyledHeader>header</StyledHeader>;
}

export default Header;
