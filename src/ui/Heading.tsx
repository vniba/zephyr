import styled, { css } from "styled-components";

// interface HeadingProps {
//   type: "h1" | "h2" | "h3";
// }
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.5rem;
    `}
  line-height: 1.5;
`;

export default Heading;
