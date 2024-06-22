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
    console.log(ctx);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorName;
    ctx.globalCompositeOperation = "source-over";

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let startX = 0;
    let startY = 0;

    const startPosition = (e) => {
      isDrawing = true;
      [startX, startY] = [e.offsetX, e.offsetY];
      [lastX, lastY] = [startX, startY];
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const [x, y] = [e.offsetX, e.offsetY];

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      // Using quadraticCurveTo for smoother lines
      ctx.quadraticCurveTo(lastX, lastY, (lastX + x) / 2, (lastY + y) / 2);
      ctx.stroke();

      [lastX, lastY] = [x, y];
    };

    const endPosition = () => {
      if (isDrawing) {
        // Draw the final segment of the curve
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(lastX, lastY);
        ctx.stroke();
      }
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
