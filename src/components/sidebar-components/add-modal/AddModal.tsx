import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../../mobx/helpers/use-store';

/** Components */
import { Modal, Input } from '../../ui';

interface AddModalProps {
  type: 'file' | 'folder';
  path: string | null;
  closeHandler: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ path, closeHandler, type }) => {
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(false);

  const { directoryStore } = useStore();

  const nameHandler = (val: string) => {
    setItemName(val);
    setError(false);
  };

  const confirmHandler = () => {
    if (itemName === '') {
      setError(true);
      return;
    }

    directoryStore.add(itemName, type, path);
    closeHandler();
  };

  return (
    <Modal
      title={`Do you want to create a ${type} in ${path ? path : 'root directory'}?`}
      onDismiss={closeHandler}
      onConfirm={confirmHandler}
    >
      <Input
        type="text"
        name="name"
        label={`Enter a ${type} name:`}
        value={itemName}
        changeHandler={nameHandler}
        error={error}
        errorMsg="You should provide a name"
      />
    </Modal>
  );
};

export default observer(AddModal);
