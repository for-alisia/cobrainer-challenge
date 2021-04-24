/** Components */
import { FileAddIcon, FolderAddIcon } from '../../ui';

/** Styles */
import styles from './SidebarControls.module.scss';

const SidebarControls = () => {
  const addFileHandler = () => {
    console.log('Add file!');
  };

  const addFolderHandler = () => {
    console.log('Add folder!');
  };
  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.title}>Explorer</div>
      <div className={styles.controls}>
        <FolderAddIcon onClick={addFolderHandler} />
        <FileAddIcon onClick={addFileHandler} />
      </div>
    </div>
  );
};

export default SidebarControls;
