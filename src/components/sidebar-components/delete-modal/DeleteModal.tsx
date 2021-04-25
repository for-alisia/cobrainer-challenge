/** Store */
import { useActions } from '../../../hooks';

/** Comonents */
import { Modal } from '../../ui';

/** Styles */
import styles from './DeleteModal.module.scss';

interface DeleteModalProps {
  type: 'file' | 'folder';
  name: string;
  path: string;
  closeHandler: () => void;
}

const EditModal: React.FC<DeleteModalProps> = ({ type, name, path, closeHandler }) => {
  const { deleteItem } = useActions();

  const deleteHandler = () => {
    deleteItem(path);
    closeHandler();
  };

  return (
    <Modal title={`Delete a ${type} ${name}`} onDismiss={closeHandler} onConfirm={deleteHandler}>
      <p className={styles.content}>
        Are you sure that you want to delete {type} {path}?
      </p>
      {type === 'folder' && (
        <span className={styles.danger}>
          All the files and folders inside {path} will be deleted!
        </span>
      )}
    </Modal>
  );
};

export default EditModal;
