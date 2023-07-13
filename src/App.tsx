import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles.ts";
const H1 = styled.h1`
  font-size: 2rem;
  color: green;
`;

const Button = styled.button`
  font-size: 1.5rem;
  padding: 1rem 2rem;
  border: none;
  background-color: deepskyblue;
  color: #1a1a1a;
`;
const Input = styled.input`
  border: 1px solid deeppink;
  border-radius: 8px;
  padding: 1rem 1.5rem;
`;

const StyledApp = styled.div`
  color: yellow;
  text-align: center;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        hello
        <H1>Zephyr</H1>
        <Input type='number' placeholder={"number"} />
        <Button onClick={() => console.log("yes")}>hello</Button>
      </StyledApp>
    </>
  );
}

export default App;
