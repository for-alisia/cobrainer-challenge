import { BsXCircle, BsPencil } from 'react-icons/bs';

/** Styles */
import styles from './ItemControls.module.scss';

const ItemControls = () => {
  return (
    <div className={styles.itemControls}>
      <BsPencil className={styles.edit} />
      <BsXCircle className={styles.delete} />
    </div>
  );
};

export default ItemControls;
