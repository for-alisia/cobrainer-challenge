/** Components */
import SidebarControls from '../sidebar-controls/SidebarControls';
import DocTree from '../doc-tree/DocTree';
import { Logo } from '../../ui';

/** Test Data */
import { structure } from '../../../test-data';

/** Styles */
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <SidebarControls />
      <DocTree data={structure} />
    </div>
  );
};

export default Sidebar;
