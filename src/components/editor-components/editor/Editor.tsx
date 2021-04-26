import { useState, useEffect } from 'react';

/** Components */
import { Button } from '../../ui';

/** Store */
import { useTypedSelector, useActions } from '../../../hooks';

/** Styles */
import styles from './Editor.module.scss';

const Editor = () => {
  const activeTab = useTypedSelector(({ directories: { activeTab } }) => activeTab);
  const { changeContent } = useActions();
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (activeTab && activeTab.content) {
      setContent(activeTab.content);
    }
  }, [activeTab]);

  const saveHandler = () => {
    if (activeTab) {
      changeContent(activeTab.path, content);
    }
  };

  return (
    <div className={styles.editor}>
      {activeTab ? (
        <div className={styles.content} onClick={() => setEditMode(true)}>
          {editMode ? (
            <>
              <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
              <div className={styles.saveButton}>
                <Button type="button" text="Save" view="success" actionHandler={saveHandler} />
              </div>
            </>
          ) : (
            activeTab.content
          )}
        </div>
      ) : (
        <span>Choose a file in sidebar</span>
      )}
    </div>
  );
};

export default Editor;
