import { observer } from 'mobx-react-lite';
import { useState, useRef } from 'react';
import { useStore } from '../../../mobx/helpers/use-store';

/** Components */
import { BsFileEarmarkPlus, BsFolderPlus } from 'react-icons/bs';
import AddModal from '../add-modal/AddModal';

/** Styles */
import styles from './SidebarControls.module.scss';

type ModalType = 'file' | 'folder';

const SidebarControls = () => {
  const [addModal, setAddModal] = useState(false);
  const modalType = useRef<ModalType>('file');

  const { directoryStore } = useStore();

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
          path={directoryStore.selectedItem ? directoryStore.selectedItem.path : null}
          type={modalType.current!}
        />
      )}
    </div>
  );
};

export default observer(SidebarControls);
