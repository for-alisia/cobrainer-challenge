import { useState } from 'react';

/** Components */
import { BsFolder, BsChevronRight, BsChevronDown, BsFileEarmark } from 'react-icons/bs';
import { ItemsControls } from '../../ui';
import EditModal from '../edit-modal/EditModal';
import DeleteModal from '../delete-modal/DeleteModal';

/** Store */
import { useActions, useTypedSelector } from '../../../hooks';

/** Models */
import { DirectoryItem } from '../../../models/directories.models';

/** Styles */
import styles from './Item.module.scss';

interface ItemProps {
  item: DirectoryItem;
  type?: 'folder' | 'file';
}

const Item: React.FC<ItemProps> = ({ item, children, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { addSelected } = useActions();

  const selectedItem = useTypedSelector(({ directories: { selectedItem } }) => selectedItem);

  const isSelected = selectedItem && selectedItem.path === item.path;

  const folderHandler = () => {
    if (type === 'folder') {
      setIsOpen(!isOpen);
    }

    addSelected(item);
  };

  const editHandler = () => {
    setEditModal(true);
  };

  const deleteHandler = () => {
    setDeleteModal(true);
  };

  return (
    <>
      <div className={styles.item}>
        <div
          className={`${styles.itemLabel} ${isSelected && styles.selectedItem}`}
          onClick={folderHandler}
        >
          {type === 'folder' && (
            <span className={styles.arrow}>{isOpen ? <BsChevronDown /> : <BsChevronRight />}</span>
          )}

          <span className={styles.folderIcon}>
            {type === 'folder' ? <BsFolder /> : <BsFileEarmark />}
          </span>
          <span>{item.name}</span>
        </div>
        <ItemsControls editHandler={editHandler} deleteHandler={deleteHandler} />
      </div>
      {isOpen && (
        <div>
          <div>{children}</div>
        </div>
      )}
      {editModal && (
        <EditModal
          type={item.type}
          name={item.name}
          path={item.path}
          closeHandler={() => setEditModal(false)}
        />
      )}
      {deleteModal && (
        <DeleteModal
          type={item.type}
          name={item.name}
          path={item.path}
          closeHandler={() => setDeleteModal(false)}
        />
      )}
    </>
  );
};

export default Item;
