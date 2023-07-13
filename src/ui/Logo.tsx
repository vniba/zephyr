import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src='/img/logo.svg' alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
