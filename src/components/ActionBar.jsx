import React, { useState } from "react";
import classes from './ActionBar.module.css';
import { FaMouse, FaEraser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import CanvasComponent from "./Canvas.jsx";

const ActionBar = () => {

  const [isCanvasPresent, setIsCanvasPresent] = useState(false);


  const eraseOnCanvas = () => {
    const canvas = document.getElementById('scrible-container-write');
    const ctx = canvas.getContext('2d');
  
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.clip();
    ctx.globalCompositeOperation = 'destination-out';
  
    let isDrawing = false;
  
    const startPosition = (e) => {
      isDrawing = true;
      draw(e);
    };
  
    const endPosition = () => {
      isDrawing = false;
    };
  
    const draw = (e) => {
      if (!isDrawing) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.lineWidth = 10;
    };
  
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
  };

  const handleExit = () => {
    const actionContainer = document.getElementById('scrible-root-container');
    actionContainer.remove();
  }

  const clearCanvas = () => {
    const canvas = document.getElementById('scrible-container-write');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  


  return (
    <div className={classes.action_bar}>
      <ul className={classes.icons}>
        <li className={`${classes.icon} ${isCanvasPresent ? classes.active : ''}`}>
          <CanvasComponent isCanvasPresent={isCanvasPresent} setIsCanvasPresent={setIsCanvasPresent} />
        </li>
        <li className={classes.icon}><FaMouse /></li>
        <li className={classes.icon} onClick={eraseOnCanvas}><FaEraser /></li>
        <li className={classes.icon} onClick={clearCanvas}><MdDelete /></li>
        <li onClick={handleExit} className={classes.icon}><IoExit /></li>
      </ul>
    </div>
  )
}

export default ActionBar;