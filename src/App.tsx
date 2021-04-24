/** Components */
import Editor from './components/editor/Editor';
import Sidebar from './components/sidebar/Sidebar';

/** Styles */
import styles from './App.module.scss';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <Editor />
    </div>
  );
};

export default App;
