import Button from '../../ui/Button.tsx';

import Modal from '../../ui/Modal.tsx';
import CreateCabinForm from './CreateCabinForm.tsx';
import CabinTable from './CabinTable.tsx';

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opensWindowName='cabin-form'>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opensWindowName='table'>
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
