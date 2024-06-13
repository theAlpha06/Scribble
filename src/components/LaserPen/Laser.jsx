import React, { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "../icon.js";
import { ColorContext } from "../../context/colorContext.jsx";

const LaserPen = ({ setIsActive }) => {
  const { colorName } = useContext(ColorContext);

  const setupCanvas = () => {
    const canvas = document.getElementById("scrible-root-container_canvas");

    setIsActive("laser_pen_icon");
    if (canvas) {
      canvas.style.cursor = `url(${iconsUrl.laserPen}) 0 35, auto`;
      canvas.classList = "laser-pen";

      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = colorName;
      ctx.globalCompositeOperation = "source-over";
      let isDrawing = false;
      let x, y;
      const rect = canvas.getBoundingClientRect();
      
      const drawQueue = [];

      const startPosition = (e) => {
        isDrawing = true;
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
        draw(e);
      };

      const draw = (e) => {
        if (!isDrawing) return;

        x = e.clientX - rect.left;
        y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();

        // Save the current path to the drawQueue
        drawQueue.push({ x, y, color: ctx.strokeStyle });
      };

      const endPosition = () => {
        isDrawing = false;
        ctx.beginPath();
      };

      // Add the event listeners
      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", endPosition);
      canvas.addEventListener("mousemove", draw);

      // Cleanup function to remove event listeners
      const cleanup = () => {
        canvas.removeEventListener("mousedown", startPosition);
        canvas.removeEventListener("mouseup", endPosition);
        canvas.removeEventListener("mousemove", draw);
      };

      // Function to clear the canvas at intervals
      const clearLaserPenStrokes = () => {
        if (drawQueue.length > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawQueue.length = 0;
        }
      };

      // Set an interval to clear the canvas every 1 second (1000 ms)
      const clearIntervalID = setInterval(clearLaserPenStrokes, 5000);

      // Cleanup both event listeners and interval on component unmount
      return () => {
        cleanup();
        clearInterval(clearIntervalID);
      };
    }
  };

  // Call setupCanvas when the component is mounted and the colorName changes
  useEffect(() => {
    const cleanup = setupCanvas();
    return cleanup;
  }, [colorName]);

  return <FaPen onClick={setupCanvas} />;
};

export default LaserPen;
