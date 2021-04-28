/** Components */
import { IoMdClose } from 'react-icons/io';

/** Styles */
import styles from './TabBar.module.scss';

const TabBar = () => {
  return (
    <div className={styles.tabBar}>
      <ul className={styles.list}></ul>
    </div>
  );
};

export default TabBar;
