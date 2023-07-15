import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable.tsx';
import Button from '../ui/Button.tsx';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm.tsx';
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>TEST</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(prevState => !prevState)}>
          Add new Cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
