import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.ts";
import { Button } from "./ui/Button.tsx";
import Input from "./ui/Input.tsx";

const H1 = styled.h1`
  font-size: 2rem;
  color: green;
`;

const StyledApp = styled.div`
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>Zephyr</H1>
        <Input />
        <Button>click</Button>
      </StyledApp>
    </>
  );
}

export default App;
