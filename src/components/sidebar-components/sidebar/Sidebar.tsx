/** Components */
import SidebarControls from '../sidebar-controls/SidebarControls';
import DocTree from '../doc-tree/DocTree';
import { Logo } from '../../ui';

/** Store */
import { useTypedSelector } from '../../../hooks';

/** Styles */
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const structure = useTypedSelector(({ directories: { structure } }) => structure);
  return (
    <div className={styles.wrapper}>
      <Logo />
      <SidebarControls />
      <div className={styles.treeWrapper}>
        <DocTree data={structure} />
      </div>
    </div>
  );
};

export default Sidebar;
