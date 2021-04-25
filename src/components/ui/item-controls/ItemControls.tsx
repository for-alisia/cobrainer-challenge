import { BsXCircle, BsPencil } from 'react-icons/bs';

/** Styles */
import styles from './ItemControls.module.scss';

interface ItemControlsProps {
  editHandler: () => void;
  deleteHandler: () => void;
}

const ItemControls: React.FC<ItemControlsProps> = ({ editHandler, deleteHandler }) => {
  return (
    <div className={styles.itemControls}>
      <BsPencil className={styles.edit} onClick={editHandler} />
      <BsXCircle className={styles.delete} onClick={deleteHandler} />
    </div>
  );
};

export default ItemControls;
