import { useState, useEffect } from 'react';

/** Components */
import { Button } from '../../ui';

/** Styles */
import styles from './Editor.module.scss';

const Editor = () => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState('');

  return <div className={styles.editor}></div>;
};

export default Editor;
