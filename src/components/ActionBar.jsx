import React, { useState } from "react";
import classes from './ActionBar.module.css';
import { FaMouse, FaEraser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import CanvasComponent from "./Pen.jsx";

const ActionBar = () => {

  const [isActive, setIsActive] = useState('mouse_icon');
  const canvas = document.getElementById('scrible-root-container_canvas');

  const eraseOnCanvas = () => {
    setIsActive('eraser_icon');
    canvas.style.cursor = 'crosshair';
    canvas.classList = 'eraser';

    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "square";
    ctx.clip();
    ctx.globalCompositeOperation = 'destination-out';

    let isDrawing = false;
    let x, y;
    const startPosition = (e) => {
      isDrawing = true;

      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      ctx.moveTo(x, y);
      draw(e);
    };

    const endPosition = () => {
      isDrawing = false;
    };

    const draw = (e) => {
      if (!isDrawing) return;

      const rect = canvas.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    };


    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
  }

  const handleExit = () => {
    const actionContainer = document.getElementById('scrible-root-container');
    const canvas = document.getElementById('scrible-root-container_canvas');
    canvas?.remove();
    actionContainer?.remove();
  }

  const clearCanvas = () => {
    const canvas = document.getElementById('scrible-root-container_canvas');
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }

  const mouseClick = () => {
    const canvas = document.getElementById('scrible-root-container_canvas');
    if (canvas) {
      canvas.classList = 'cursor';
    }
    setIsActive('mouse_icon');
  }



  return (
    <div className={classes.action_bar}>
      <ul className={classes.icons}>
        <li className={`${classes.icon} ${isActive === 'pen_icon' ? classes.active : ''}`} title="Pen">
          <CanvasComponent setIsActive={setIsActive} />
        </li>
        <li className={`${classes.icon} ${isActive === 'mouse_icon' ? classes.active : ''}`} onClick={mouseClick} title="Mouse"><FaMouse /></li>
        <li className={`${classes.icon} ${isActive === 'eraser_icon' ? classes.active : ''}`} onClick={eraseOnCanvas} title="Eraser"><FaEraser /></li>
        <li className={classes.icon} onClick={clearCanvas} title="Clear Canvas"><MdDelete /></li>
        <li onClick={handleExit} className={classes.icon} title="Exit"><IoExit /></li>
      </ul>
    </div>
  )
}

export default ActionBar;