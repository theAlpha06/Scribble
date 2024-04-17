import React from 'react';
import styles from './ColorPalette.module.css';

function ColorPalette() {
  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles.red}`}></div>
      <div className={`${styles.circle} ${styles.green}`}></div>
      <div className={`${styles.circle} ${styles.white}`}></div>
      <div className={`${styles.circle} ${styles.black}`}></div>
    </div>
  );
}

export default ColorPalette;
