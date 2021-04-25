import { useState } from 'react';

/** Components */
import { Modal } from '../../ui';

/** Store */
import { useActions } from '../../../hooks';

/** Styles */
import styles from './AddModal.module.scss';

interface AddModalProps {
  type: 'file' | 'folder';
  path: string | null;
  closeHandler: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ path, closeHandler, type }) => {
  const [itemName, setItemName] = useState('');

  const { addItem } = useActions();

  const confirmHandler = () => {
    // TODO: Need to check if file or folder with this name is already exists
    if (itemName !== '') {
      addItem(itemName, path, type);
      closeHandler();
    }
  };

  return (
    <Modal
      title={`Do you want to create a ${type} in ${path ? path : 'root directory'}?`}
      onDismiss={closeHandler}
      onConfirm={confirmHandler}
    >
      <form>
        <label htmlFor="name">{type} name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default AddModal;
