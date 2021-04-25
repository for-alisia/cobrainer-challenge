/** Components */
import { ImBook } from 'react-icons/im';

/** Styles */
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <ImBook />
      <span className={styles.logoTitle}>Simple Code Editor</span>
    </div>
  );
};

export default Logo;
