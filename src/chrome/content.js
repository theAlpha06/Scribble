import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '../popup.jsx';
import './styles.css';


const containerDiv = document.createElement('div');
containerDiv.id = 'scrible-root-container';
containerDiv.classList = 'scribble-root-container';
document.body.appendChild(containerDiv);

let isDragging = false;
let offsetX, offsetY;

function handleMouseDown(event) {
  isDragging = true;
  offsetX = event.clientX - containerDiv.getBoundingClientRect().left;
  offsetY = event.clientY - containerDiv.getBoundingClientRect().top;
}

function handleMouseMove(event) {
  if (!isDragging) return;

  const newLeft = event.clientX - offsetX;
  const newTop = event.clientY - offsetY;

  containerDiv.style.left = `${newLeft}px`;
  containerDiv.style.top = `${newTop}px`;
}

function handleMouseUp() {
  isDragging = false;
}

document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

containerDiv.addEventListener('mousedown', handleMouseDown);

ReactDOM.render(<Popup />, containerDiv);