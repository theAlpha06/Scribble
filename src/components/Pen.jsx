import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "./icon.js";
import { ColorContext } from "../context/colorContext.jsx";

export const setupCanvas = (setIsActive, colorName) => {
  const canvas = document.getElementById("scrible-root-container_canvas");

  setIsActive("pen_icon");
  if (canvas) {
    canvas.style.cursor = `url(${iconsUrl.pen}) 0 35, auto`;
    canvas.classList = "pen";

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorName;
    ctx.globalCompositeOperation = "source-over";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startPosition = (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const [x, y] = [e.offsetX, e.offsetY];

      ctx.lineTo(lastX, lastY);
      ctx.stroke();

      [lastX, lastY] = [x, y];
    };

    const endPosition = () => {
      isDrawing = false;
      ctx.beginPath();
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
    };
  }
};

const Pen = ({ setIsActive, isActive }) => {
  const { colorName } = useContext(ColorContext);
  if (isActive == "pen_icon") {
    useEffect(() => {
      const mountCanvas = setupCanvas(setIsActive, colorName);
      return mountCanvas;
    }, [colorName, setIsActive]);
  }

  return <FaPen onClick={() => setupCanvas(setIsActive, colorName)} />;
};

export default Pen;
