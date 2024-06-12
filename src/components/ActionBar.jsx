import React, { useState, useContext } from "react";
import classes from "./ActionBar.module.css";
import { FaMouse, FaEraser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import CanvasComponent from "./Pen.jsx";
import { iconsUrl } from "./icon.js";
import ColorPalette from "./ColorPalette/ColorPalette.jsx";
import ColourPicker from "./ColorPicker/ColorPicker.jsx";
import { ColorContext } from "../context/colorContext.jsx";
import Separator from "./Separator/Separator.jsx";

const ActionBar = () => {
  const [isActive, setIsActive] = useState("mouse_icon");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvas = document.getElementById("scrible-root-container_canvas");
  const { colorName } = useContext(ColorContext);

  const eraseOnCanvas = () => {
    setIsActive("eraser_icon");
    canvas.style.cursor = `url(${iconsUrl.eraser}) 17 17, auto`;
    canvas.classList = "eraser";

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 30;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "square";
    ctx.clip();
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;
    let x, y;
    const startPosition = (e) => {
      isDrawing = true;

      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      ctx.moveTo(x, y);
      draw(e);
    };

    const endPosition = () => {
      isDrawing = false;
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    const cleanup = () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
    };

    return cleanup;
  };

  const handleExit = () => {
    const actionContainer = document.getElementById("scrible-root-container");
    const canvas = document.getElementById("scrible-root-container_canvas");
    canvas?.remove();
    actionContainer?.remove();
  };

  const clearCanvas = () => {
    const canvas = document.getElementById("scrible-root-container_canvas");
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const mouseClick = () => {
    const canvas = document.getElementById("scrible-root-container_canvas");
    if (canvas) {
      canvas.classList = "cursor";
    }
    setIsActive("mouse_icon");
  };

  return (
    <div className={classes.action_bar}>
      <section className={classes.tools}>
        <ul className={classes.icons}>
          <li
            className={`${classes.icon} ${
              isActive === "pen_icon" ? classes.active : ""
            }`}
            title="Pen"
          >
            <CanvasComponent setIsActive={setIsActive} />
          </li>
          <li
            className={`${classes.icon} ${
              isActive === "mouse_icon" ? classes.active : ""
            }`}
            onClick={mouseClick}
            title="Mouse"
          >
            <FaMouse />
          </li>
          <li
            className={`${classes.icon} ${
              isActive === "eraser_icon" ? classes.active : ""
            }`}
            onClick={eraseOnCanvas}
            title="Eraser"
          >
            <FaEraser />
          </li>
        </ul>
      </section>
      <Separator />
      <section className={classes.colour}>
        <ul className={classes.icons}>
          <li>
            <ColorPalette />
          </li>
          <li>
            <div
              className={classes.activeColor}
              style={{ backgroundColor: colorName }}
              onClick={() => {
                setShowColorPicker((prev) => !prev);
              }}
            ></div>
            {showColorPicker && (
              <ColourPicker
                theme={{
                  background: '#d4e2ef',
                  width: "4px",
                }}
              />
            )}
          </li>
        </ul>
      </section>
      <Separator />
      <section className={classes.exit}>
        <ul className={classes.icons}>
          <li
            className={classes.icon}
            onClick={clearCanvas}
            title="Clear Canvas"
          >
            <MdDelete />
          </li>
          <li onClick={handleExit} className={classes.icon} title="Exit">
            <IoExit />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ActionBar;
