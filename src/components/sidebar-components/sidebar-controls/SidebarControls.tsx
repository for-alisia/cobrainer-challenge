import { useState, useRef } from 'react';

/** Components */
import { BsFileEarmarkPlus, BsFolderPlus } from 'react-icons/bs';
import AddModal from '../add-modal/AddModal';

/** Store */
import { useTypedSelector } from '../../../hooks';

/** Styles */
import styles from './SidebarControls.module.scss';

type ModalType = 'file' | 'folder';

const SidebarControls = () => {
  const [addModal, setAddModal] = useState(false);
  const modalType = useRef<ModalType>('file');

  const selectedItem = useTypedSelector(({ directories: { selectedItem } }) => selectedItem);

  const addFileHandler = () => {
    modalType.current = 'file';
    setAddModal(true);
  };

  const addFolderHandler = () => {
    modalType.current = 'folder';
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
  };

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.title}>Explorer</div>
      <div className={styles.controls}>
        <BsFolderPlus onClick={addFolderHandler} />
        <BsFileEarmarkPlus onClick={addFileHandler} />
      </div>
      {addModal && (
        <AddModal
          closeHandler={closeModal}
          path={selectedItem ? selectedItem.path : null}
          type={modalType.current!}
        />
      )}
    </div>
  );
};

export default SidebarControls;
