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
      let x, y;
      const rect = canvas.getBoundingClientRect();

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

        ctx.strokeStyle = colorName;
        ctx.lineTo(x, y);
        ctx.stroke();
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
    const cleanup = setupCanvas();

    return cleanup;
  }, [colorName]);

  return <FaPen onClick={setupCanvas} />;
};

export default Pen;
