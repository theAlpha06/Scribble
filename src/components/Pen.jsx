import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "./icon.js";
import { ColorContext } from "../context/colorContext.jsx";
import { tintCursorImageRed } from "../utils/invertIcon.jsx";
import { saveCanvasToLocalStorage, loadCanvasFromLocalStorage } from "../utils/saveCanvas.jsx";

export const setupCanvas = (setIsActive, colorName) => {
  const canvas = document.getElementById("scrible-root-container_canvas");

  setIsActive("pen_icon");
  if (canvas) {
    canvas.style.cursor = `url(${iconsUrl.pen}) 0 35, auto`;
    canvas.classList = "pen";
    tintCursorImageRed(iconsUrl.pen)
      .then((reddishCursorUrl) => {
        canvas.style.cursor = `url(${reddishCursorUrl}) 0 35, auto`;
      })
      .catch((error) => {
        console.error("Error tinting cursor image:", error);
      });

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorName;
    ctx.globalCompositeOperation = "source-over";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startPosition = (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
      ctx.beginPath();
      ctx.shadowBlur = 1;
      ctx.shadowColor = colorName;
      ctx.moveTo(lastX, lastY);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const [x, y] = [e.offsetX, e.offsetY];

      ctx.lineTo(x, y);
      ctx.stroke();

      [lastX, lastY] = [x, y];
    };

    const endPosition = () => {
      isDrawing = false;
      ctx.closePath();
      saveCanvasToLocalStorage(canvas);
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);

    loadCanvasFromLocalStorage(canvas);

    const handleBeforeUnload = () => saveCanvasToLocalStorage(canvas);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseout", endPosition);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }
};

const Pen = ({ setIsActive, isActive }) => {
  const { colorName } = useContext(ColorContext);

  useEffect(() => {
    if (isActive === "pen_icon") {
      const cleanupCanvas = setupCanvas(setIsActive, colorName);
      return cleanupCanvas;
    }
  }, [colorName, setIsActive, isActive]);

  return <FaPen onClick={() => setupCanvas(setIsActive, colorName)} />;
};

export default Pen;
