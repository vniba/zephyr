import styled from 'styled-components';

const StyledLogo = styled.div`
  margin: 0 auto;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
  @media (max-width: 800px) {
    height: 4rem;
  }
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src='/img/logo.svg' alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
