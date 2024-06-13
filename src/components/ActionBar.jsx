import React, { useState, useContext } from "react";
import classes from "./ActionBar.module.css";
import CanvasComponent from "./Pen.jsx";
import { iconsUrl } from "./icon.js";
import ColorPalette from "./ColorPalette/ColorPalette.jsx";
import KeyboardListener from "../utils/hotkeys.jsx";
import ColourPicker from "./ColorPicker/ColorPicker.jsx";
import { ColorContext } from "../context/colorContext.jsx";
import Separator from "./Separator/Separator.jsx";
import { FiMinimize } from "react-icons/fi";
import { BsTextareaT } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaMouse, FaEraser } from "react-icons/fa";

const ActionBar = () => {
  const [isActive, setIsActive] = useState("mouse_icon");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const canvas = document.getElementById("scrible-root-container_canvas");
  const { colorName } = useContext(ColorContext);

  // TODO: Need to fix this!!!
  const setToolToPen = () => {
    setIsActive("pen_icon");
  };

  const setToolToEraser = () => {
    setIsActive("eraser_icon");
    eraseOnCanvas();
  };

  const setToolToMouse = () => {
    setIsActive("mouse_icon");
    mouseClick();
  };

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

  const textOnCanvas = () => {
    setIsActive("text_icon");
    canvas.style.cursor = "text";
    canvas.classList = "text";
  };

  const handleScreenshot = () => {
    const canvas = document.getElementById("scrible-root-container_canvas");
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = image;
    downloadLink.download = "canvas_image.png";
    downloadLink.innerHTML = "Download Image";
    downloadLink.click();
  };

  const handleMinimize = () => {
    // const containerDiv = document.getElementById("scrible-root-container");
    // if(containerDiv) {
    //   containerDiv.remove();
    // }
    alert("Coming Soon!");
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
      <KeyboardListener
        setToolToPen={setToolToPen}
        setToolToEraser={setToolToEraser}
        setToolToMouse={setToolToMouse}
        handleScreenshot={handleScreenshot}
        handleExit={handleExit}
        clearCanvas={clearCanvas}
      />
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
              isActive === "text_icon" ? classes.active : ""
            }`}
            onClick={textOnCanvas}
            title="Text"
          >
            <BsTextareaT />
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
                  background: "#d4e2ef",
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
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={clearCanvas}
            title="Clear Canvas"
          >
            <MdDelete />
          </li>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={handleScreenshot}
            title="Save canvas"
          >
            <FaCameraRetro />
          </li>
          <li
            onClick={handleMinimize}
            className={`${classes.icon} ${classes.gridItem}`}
            title="Hide Toolbar - Coming Soon!"
          >
            <FiMinimize />
          </li>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={handleExit}
            title="Exit"
          >
            <IoExit />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ActionBar;
