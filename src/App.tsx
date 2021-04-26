/** Components */
import Editor from './components/editor-components/editor/Editor';
import Sidebar from './components/sidebar-components/sidebar/Sidebar';
import TabBar from './components/editor-components/tabBar/TabBar';
import { Notification } from './components/ui';

/** Store */
import { useTypedSelector } from './hooks';

/** Styles */
import styles from './App.module.scss';

const App = () => {
  const notification = useTypedSelector(({ directories: { message } }) => message);
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.editor}>
        <TabBar />
        <Editor />
      </div>
      {notification && <Notification type="warning" text={notification} />}
    </div>
  );
};

export default App;
