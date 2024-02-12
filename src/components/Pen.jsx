import React, { useEffect } from "react";
import { FaPen } from "react-icons/fa";

const Pen = ({ setIsActive }) => {

  const penInput = () => {
    setIsActive('pen_icon');
    const canvas = document.getElementById('scrible-root-container_canvas');

    if (canvas) {
      canvas.style.cursor = 'pointer';
      canvas.classList = 'pen';

      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "green";
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      let isDrawing = false;
      const draw = (e) => {
        if (!isDrawing) return;
        ctx.strokeStyle = "green";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
      };
      const startPosition = (e) => {
        isDrawing = true;
        draw(e);
      };

      const endPosition = () => {
        isDrawing = false;
        ctx.beginPath();
      };

      // Add event listeners
      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", endPosition);
      canvas.addEventListener("mousemove", draw);
    }
  };

  return <FaPen onClick={penInput} />;
};

export default Pen;