import React from "react";
import { FaPen } from "react-icons/fa";

const Pen = ({ setIsActive }) => {

  const penInput = () => {
    setIsActive('pen_icon');
    const canvas = document.getElementById('scrible-root-container_canvas');
    canvas.style.cursor = 'pointer';
    canvas.classList = 'pen';
    if (canvas) {

      // canvas.removeEventListener("mousedown", startPosition);
      // canvas.removeEventListener("mouseup", endPosition);
      // canvas.removeEventListener("mousemove", draw);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext("2d");
      ctx.strokeStyle = "green";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      let isDrawing = false;
      const startPosition = (e) => {
        isDrawing = true;
        draw(e);
      };

      const endPosition = () => {
        isDrawing = false;
        ctx.beginPath();
      };
      const draw = (e) => {
        if (!isDrawing) return;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
      };
      canvas.addEventListener("mousedown", startPosition);
      canvas.addEventListener("mouseup", endPosition);
      canvas.addEventListener("mousemove", draw);
    }
  };

  return <FaPen onClick={penInput} />;
};

export default Pen;