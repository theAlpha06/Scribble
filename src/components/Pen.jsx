import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "./icon.js";
import { ColorContext } from "../context/colorContext.jsx";

const Pen = ({ setIsActive }) => {
  const { colorName } = useContext(ColorContext);

  const setupCanvas = () => {
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
        
        ctx.quadraticCurveTo(lastX, lastY, (x + lastX) / 2, (y + lastY) / 2);
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

  useEffect(() => {
    return setupCanvas();
  }, [colorName]);

  return <FaPen onClick={setupCanvas} />;
};

export default Pen;
