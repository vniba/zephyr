import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${({ as }) =>
    as === 'h1' &&
    css`
      font-size: 3.5rem;
    `}
  line-height: 1.5;
`;

export default Heading;
