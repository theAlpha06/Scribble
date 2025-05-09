import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "./icon.js";
import { ColorContext } from "../context/colorContext.jsx";
import { tintCursorImageRed } from "../utils/invertIcon.jsx";
import { saveCanvasToLocalStorage, loadCanvasFromLocalStorage } from "../utils/saveCanvas.jsx";

export const setupCanvas = (setIsActive, colorName, setRestoreArray, setIndex) => {
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

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startPosition = (e) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = colorName;
      ctx.globalCompositeOperation = "source-over";
      // ctx.shadowBlur = 1;
      // ctx.shadowColor = colorName;

      [lastX, lastY] = [e.offsetX, e.offsetY];
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
      if (isDrawing) {
        ctx.closePath();
        isDrawing = false;
        setRestoreArray((prevItem) => [...prevItem, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
        setIndex(prev => prev + 1);
      }

      saveCanvasToLocalStorage(canvas);
    };

    const handleBeforeUnload = () => saveCanvasToLocalStorage(canvas);

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mouseout", endPosition);

    window.addEventListener("beforeunload", handleBeforeUnload);

    loadCanvasFromLocalStorage(canvas);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mouseout", endPosition);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }
};

const Pen = ({ setIsActive, isActive, setRestoreArray, setIndex }) => {
  const { colorName } = useContext(ColorContext);

  useEffect(() => {
    if (isActive === "pen_icon") {
      const cleanup = setupCanvas(setIsActive, colorName, setRestoreArray, setIndex);
      return cleanup;
    }
  }, [colorName, setIsActive, isActive]);

  return (
    <div className="pen-icon" onClick={() => setIsActive("pen_icon")}>
      <FaPen />
    </div>
  );
};

export default Pen;
