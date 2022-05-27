import React from 'react';
import Note2x1 from './note-2x1';
import styles from './index.m.less';

export const noteVersion = '1.0.0';

const NoteList = () => {
  return (
    <div className={styles.releaseNote}>
      <Note2x1 />
    </div>
  );
};

export default NoteList;
