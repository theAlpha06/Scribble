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
      <div className={`${styles.circle} ${styles.red} ${activeColor === 'red' ? styles.active : ''}`} onClick={() => handleColorSelect('red')}></div>
      <div className={`${styles.circle} ${styles.green} ${activeColor === 'green' ? styles.active : ''}`} onClick={() => handleColorSelect('green')}></div>
      <div className={`${styles.circle} ${styles.white} ${activeColor === 'white' ? styles.active : ''}`} onClick={() => handleColorSelect('white')}></div>
      <div className={`${styles.circle} ${styles.black} ${activeColor === 'black' ? styles.active : ''}`} onClick={() => handleColorSelect('black')}></div>
    </div>
  );
}

export default ColorPalette;
