import { useState, useEffect } from 'react';

/** Components */
import { Button } from '../../ui';

/** Store */
import { useTypedSelector, useActions } from '../../../hooks';

/** Styles */
import styles from './Editor.module.scss';

const Editor = () => {
  const selectedItem = useTypedSelector(({ directories: { selectedItem } }) => selectedItem);
  const { changeContent } = useActions();
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedItem && selectedItem.content) {
      setContent(selectedItem.content);
    }
  }, [selectedItem]);

  const saveHandler = () => {
    if (selectedItem) {
      changeContent(selectedItem.path, content);
    }
  };

  return (
    <div className={styles.editor}>
      {selectedItem && selectedItem.type === 'file' ? (
        <div className={styles.content} onClick={() => setEditMode(true)}>
          {editMode ? (
            <>
              <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
              <div className={styles.saveButton}>
                <Button type="button" text="Save" view="success" actionHandler={saveHandler} />
              </div>
            </>
          ) : (
            selectedItem.content
          )}
        </div>
      ) : (
        <span>Choose a file in sidebar</span>
      )}
    </div>
  );
};

export default Editor;
