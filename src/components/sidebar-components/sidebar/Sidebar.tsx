import { observer } from 'mobx-react-lite';
import { useStore } from '../../../mobx/helpers/use-store';
/** Components */
import SidebarControls from '../sidebar-controls/SidebarControls';
import DocTree from '../doc-tree/DocTree';
import { Logo } from '../../ui';

/** Styles */
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { directoryStore } = useStore();

  const clickHandler = (e: any) => {
    if (e.target.dataset.el === 'out') {
      directoryStore.removeSelected();
    }
  };

  console.log('re-render');

  return (
    <div className={styles.wrapper} onClick={clickHandler} data-el="out">
      <Logo />
      <SidebarControls />
      <div className={styles.treeWrapper}>
        <DocTree data={directoryStore.structure} />
      </div>
    </div>
  );
};

export default observer(Sidebar);
