import { useEffect } from 'react';

/** Components */
import SidebarControls from '../sidebar-controls/SidebarControls';
import DocTree from '../doc-tree/DocTree';
import { Logo } from '../../ui';

/** Store */
import { useTypedSelector, useActions } from '../../../hooks';

/** Styles */
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const structure = useTypedSelector(({ directories: { structure } }) => structure);

  const { removeSelected, fetchStructure } = useActions();

  const clickHandler = (e: any) => {
    if (e.target.dataset.el === 'out') {
      removeSelected();
    }
  };

  useEffect(() => {
    fetchStructure();
  }, [fetchStructure]);

  return (
    <div className={styles.wrapper} onClick={clickHandler} data-el="out">
      <Logo />
      <SidebarControls />
      <div className={styles.treeWrapper}>
        <DocTree data={structure} />
      </div>
    </div>
  );
};

export default Sidebar;
