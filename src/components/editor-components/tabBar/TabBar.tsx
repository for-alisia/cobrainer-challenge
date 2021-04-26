/** Components */
import { IoMdClose } from 'react-icons/io';

/** Store */
import { useTypedSelector, useActions } from '../../../hooks';

/** Styles */
import styles from './TabBar.module.scss';

const TabBar = () => {
  const openedTabs = useTypedSelector(({ directories: { openedTabs } }) => openedTabs);
  const activeTab = useTypedSelector(({ directories: { activeTab } }) => activeTab);
  const { setActiveTab, removeFromTabs } = useActions();

  if (openedTabs.length === 0) {
    return null;
  }

  return (
    <div className={styles.tabBar}>
      <ul className={styles.list}>
        {openedTabs.map((tab) => (
          <li
            key={tab.path}
            className={activeTab === tab ? styles.active : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
            <IoMdClose
              className={styles.ioClose}
              onClick={(e) => {
                e.stopPropagation();
                removeFromTabs(tab);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
