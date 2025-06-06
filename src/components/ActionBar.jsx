import React, { useState, useContext, useRef, useEffect } from "react";
import classes from "./ActionBar.module.css";
import CanvasComponent from "./Pen.jsx";
import { iconsUrl } from "./icon.js";
import ColorPalette from "./ColorPalette/ColorPalette.jsx";
import { setupCanvas } from "./Pen.jsx";
import KeyboardListener from "../utils/hotkeys.jsx";
import ColourPicker from "./ColorPicker/ColorPicker.jsx";
import { ColorContext } from "../context/colorContext.jsx";
import Separator from "./Separator/Separator.jsx";
import { FiMinimize } from "react-icons/fi";
import { BsTextareaT } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";
import { IoExit } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { IoArrowUndoSharp } from "react-icons/io5";
import { IoArrowRedoSharp } from "react-icons/io5";
import { FaMouse, FaEraser } from "react-icons/fa";

const ActionBar = () => {
  const [isActive, setIsActive] = useState("mouse_icon");
  const [restoreArray, setRestoreArray] = useState([]);
  const [index, setIndex] = useState(-1);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { colorName } = useContext(ColorContext);
  const canvas = document.getElementById("scrible-root-container_canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  const colorPickerRef = useRef(null);

  const setToolToPen = () => {
    setupCanvas(setIsActive, colorName);
  };

  const handleUndo = () => {
    if (index >= 0) {
      setIndex((prevIndex) => prevIndex - 1);
      if (index === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else if (index > 0) {
        ctx.putImageData(restoreArray[index - 1], 0, 0);
      }
    }
  };
  const handleRedo = () => {
    if (index < restoreArray.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      ctx.putImageData(restoreArray[index + 1], 0, 0);
    }
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
    const containerDiv = document.getElementById("scrible-root-container");
    if (containerDiv) {
      containerDiv.style.display = "none";
    }
  };

  const handleExit = () => {
    const actionContainer = document.getElementById("scrible-root-container");
    canvas?.remove();
    actionContainer?.remove();
  };

  const clearCanvas = () => {
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const mouseClick = () => {
    if (canvas) {
      canvas.classList = "cursor";
    }
    setIsActive("mouse_icon");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

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
            title="Pen | Ctrl + Shift + 1"
          >
            <CanvasComponent
              setIsActive={setIsActive}
              isActive={isActive}
              setRestoreArray={setRestoreArray}
              setIndex={setIndex}
            />
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
            title="Mouse | Ctrl + Shift + 3"
          >
            <FaMouse />
          </li>
          <li
            className={`${classes.icon} ${
              isActive === "eraser_icon" ? classes.active : ""
            }`}
            onClick={eraseOnCanvas}
            title="Eraser | Ctrl + Shift + 2"
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
              <div ref={colorPickerRef}>
                <ColourPicker
                  theme={{
                    background: "#d4e2ef",
                    width: "4px",
                  }}
                />
              </div>
            )}
          </li>
        </ul>
      </section>
      <Separator />
      <section className={classes.exit}>
        <ul className={classes.icons_controls}>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={handleUndo}
            title="Undo"
          >
            <IoArrowUndoSharp />
          </li>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={handleRedo}
            title="Redo"
          >
            <IoArrowRedoSharp />
          </li>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={clearCanvas}
            title="Clear Canvas | Ctrl + Shift + 5"
          >
            <MdDelete />
          </li>
          <li
            className={`${classes.icon} ${classes.gridItem}`}
            onClick={handleScreenshot}
            title="Save canvas | Ctrl + Shift + 4"
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
            title="Exit | Ctrl + Shift + 6"
          >
            <IoExit />
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ActionBar;
