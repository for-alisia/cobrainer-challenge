import { observer } from 'mobx-react-lite';
import { useStore } from './mobx/helpers/use-store';
/** Components */
import Sidebar from './components/sidebar-components/sidebar/Sidebar';
import { Notification } from './components/ui';

/** Styles */
import styles from './App.module.scss';

const App = () => {
  const { directoryStore } = useStore();
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.editor}>Content goes here</div>
      {directoryStore.message && <Notification type="warning" text={directoryStore.message} />}
    </div>
  );
};

export default observer(App);
