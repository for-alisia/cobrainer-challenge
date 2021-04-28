import { observer } from 'mobx-react-lite';
import { useStore } from '../../../mobx/helpers/use-store';
import { useState } from 'react';

/** Comonents */
import { Modal, Input } from '../../ui';

interface EditModalProps {
  type: 'file' | 'folder';
  name: string;
  path: string;
  closeHandler: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ type, name, path, closeHandler }) => {
  const [itemName, setItemName] = useState(name);
  const [error, setError] = useState(false);

  const { directoryStore } = useStore();

  const changeHandler = (val: string) => {
    setItemName(val);
    setError(false);
  };
  const editHandler = () => {
    if (itemName === '') {
      setError(true);
      return;
    }
    directoryStore.edit(itemName, path);
    closeHandler();
  };
  return (
    <Modal title="Do you want to edit?" onDismiss={closeHandler} onConfirm={editHandler}>
      <Input
        type="text"
        name="name"
        label={`Edit ${type} name:`}
        value={itemName}
        changeHandler={changeHandler}
        error={error}
        errorMsg="You should provide a name"
      />
    </Modal>
  );
};

export default observer(EditModal);
