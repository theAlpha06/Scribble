import React, { useContext } from 'react';
import { ColorContext } from '../../context/colorContext.jsx';
import styles from './ColorPalette.module.css';

function ColorPalette() {
  const { setColorName } = useContext(ColorContext);

  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles.red}`} onClick={() => setColorName('red')}></div>
      <div className={`${styles.circle} ${styles.green}`} onClick={() => setColorName('green')}></div>
      <div className={`${styles.circle} ${styles.white}`} onClick={() => setColorName('white')}></div>
      <div className={`${styles.circle} ${styles.black}`} onClick={() => setColorName('black')}></div>
    </div>
  );
}

export default ColorPalette;
