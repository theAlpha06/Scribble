import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import { iconsUrl } from "./icon.js";
import { ColorContext } from "../context/colorContext.jsx";
import { tintCursorImageRed } from "../utils/invertIcon.jsx";

export const setupCanvas = (setIsActive, colorName) => {
  const canvas = document.getElementById("scrible-root-container_canvas");

  setIsActive("pen_icon");
  if (canvas) {
    tintCursorImageRed(iconsUrl.pen)
      .then((reddishCursorUrl) => {
        canvas.style.cursor = `url(${reddishCursorUrl}) 0 35, auto`;
      })
      .catch((error) => {
        console.error("Error tinting cursor image:", error);
      });
    canvas.classList = "pen";

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorName;
    ctx.globalCompositeOperation = "source-over";

    let isDrawing = false;
    let points = []; 

    const startPosition = (e) => {
      isDrawing = true;
      points = [{ x: e.offsetX, y: e.offsetY }];
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
    };

    const draw = (e) => {
      if (!isDrawing) return;

      points.push({ x: e.offsetX, y: e.offsetY });

      if (points.length >= 4) {
        const [p0, p1, p2, p3] = points;

        
        points = [p3];
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();
      }
    };

    const endPosition = () => {
      isDrawing = false;
      if (points.length >= 4) {
        const [p0, p1, p2, p3] = points;
        ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        ctx.stroke();
      }
      ctx.closePath();
      points = [];
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);

    return () => {
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseout", endPosition);
    };
  }
};

const Pen = ({ setIsActive, isActive }) => {
  const { colorName } = useContext(ColorContext);
  if (isActive === "pen_icon") {
    useEffect(() => {
      const cleanupCanvas = setupCanvas(setIsActive, colorName);
      return cleanupCanvas;
    }, [colorName, setIsActive]);
  }

  return <FaPen onClick={() => setupCanvas(setIsActive, colorName)} />;
};

export default Pen;
