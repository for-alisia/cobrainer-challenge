/** Components */
import SidebarControls from '../sidebar-controls/SidebarControls';
import DocList from '../doc-list/DocList';
import { Logo } from '../ui';

/** Styles */
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <SidebarControls />
      <DocList />
    </div>
  );
};

export default Sidebar;
