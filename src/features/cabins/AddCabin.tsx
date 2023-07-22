import Button from '../../ui/Button.tsx';
import { useState } from 'react';
import Row from '../../ui/Row.tsx';
import Modal from '../../ui/Modal.tsx';
import CreateCabinForm from './CreateCabinForm.tsx';

function AddCabin() {
  const [isOPenModal, setIsOpenModal] = useState(false);

  return (
    <Row>
      <Button onClick={() => setIsOpenModal(prevState => !prevState)}>
        Add new Cabin
      </Button>
      {isOPenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm />
        </Modal>
      )}
    </Row>
  );
}

export default AddCabin;
