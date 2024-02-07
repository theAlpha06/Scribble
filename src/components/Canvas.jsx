import React from "react";
import { FaPen } from "react-icons/fa";

const CanvasComponent = ({ isCanvasPresent, setIsCanvasPresent }) => {

  const toggleCanvas = () => {
    if (isCanvasPresent) {
      const canvas = document.getElementById('scrible-container-write');
      canvas?.remove();
      setIsCanvasPresent(false);
    } else {
      const writeContainer = document.createElement("canvas");
      writeContainer.width = window.innerWidth;
      writeContainer.height = window.innerHeight;

      const ctx = writeContainer.getContext("2d");
      ctx.strokeStyle = "black";
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
      writeContainer.addEventListener("mousedown", startPosition);
      writeContainer.addEventListener("mouseup", endPosition);
      writeContainer.addEventListener("mousemove", draw);

      writeContainer.classList = 'scrible-container-write';
      writeContainer.id = 'scrible-container-write';
      document.body.insertBefore(writeContainer, document.body.firstChild);
      setIsCanvasPresent(true);
    }
  };

  return <FaPen onClick={toggleCanvas} />;
};

export default CanvasComponent;
