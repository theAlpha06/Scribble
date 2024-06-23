import React, { useState, useContext } from "react";
import { SketchPicker } from "react-color";
import { ColorContext } from "../../context/colorContext.jsx";
import classes from "./ColorPicker.module.css";

const ColourPicker = () => {
  const [color, setColor] = useState("#fff");
  const { setColorName } = useContext(ColorContext);

  return (
    <div className={classes.container}>
      <SketchPicker
        color={color}
        onChange={(color) => setColorName(color.hex)}
      />
    </div>
  );
};

export default ColourPicker;
