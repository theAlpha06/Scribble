import React, { useContext, useState } from 'react';
import { ColorContext } from '../../context/colorContext.jsx';
import styles from './ColorPalette.module.css';

function ColorPalette() {
  const { setColorName, colorName } = useContext(ColorContext);
  const [activeColor, setActiveColor] = useState(colorName);

  const handleColorSelect = (color) => {
    setColorName(color);
    setActiveColor(color);
  }


  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles.red} ${activeColor === '#f00' ? styles.active : ''}`} onClick={() => handleColorSelect('#f00')}></div>
      <div className={`${styles.circle} ${styles.green} ${activeColor === '#0f0' ? styles.active : ''}`} onClick={() => handleColorSelect('#0f0')}></div>
      <div className={`${styles.circle} ${styles.white} ${activeColor === '#fff' ? styles.active : ''}`} onClick={() => handleColorSelect('#fff')}></div>
      <div className={`${styles.circle} ${styles.black} ${activeColor === '#000' ? styles.active : ''}`} onClick={() => handleColorSelect('#000')}></div>
    </div>
  );
}

export default ColorPalette;
