import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles.ts';
import { Button } from './ui/Button.tsx';
import Input from './ui/Input.tsx';
import Heading from './ui/Heading.tsx';
import Row from './ui/Row.tsx';

const StyledApp = styled.div`
  padding: 2rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type='horizontal'>
            <Heading as='h1'>Zephyr</Heading>
            <div>
              <Heading as='h3'>Check in And Out</Heading>
              <Button>Check In</Button>
              <Button variation='secondary'>Check Out</Button>
            </div>
          </Row>
          <Row type='vertical'>
            <Heading as='h3'>Form</Heading>
            <form>
              <Input />
              <Input />
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
