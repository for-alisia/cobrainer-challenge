import { useState } from 'react';

/** Components */
import { BsFolder, BsChevronRight, BsChevronDown, BsFileEarmark } from 'react-icons/bs';
import { ItemsControls } from '../../ui';

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

  const { addSelected } = useActions();

  const selectedItem = useTypedSelector(({ directories: { selectedItem } }) => selectedItem);

  const isSelected = selectedItem && selectedItem.path === item.path;

  const folderHandler = () => {
    if (type === 'folder') {
      setIsOpen(!isOpen);
    }

    addSelected(item);
  };

  return (
    <>
      <div className={styles.folder}>
        <div
          className={`${styles.folderLabel} ${isSelected && styles.selectedItem}`}
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
        <ItemsControls />
      </div>
      {isOpen && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </>
  );
};

export default Item;
