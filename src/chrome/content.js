import React from "react";
import ReactDOM from "react-dom";
import { Popup } from "../popup.jsx";
import "./styles.css";

const initializeScribble = () => {
  const containerDiv = document.createElement("div");
  containerDiv.id = "scrible-root-container";
  containerDiv.classList.add("scribble-root-container");
  document.body.appendChild(containerDiv);

  const canvasDiv = document.createElement("canvas");
  canvasDiv.id = "scrible-root-container_canvas";
  canvasDiv.width = document.body.clientWidth;
  canvasDiv.height = document.body.clientHeight;
  canvasDiv.classList = "cursor";
  document.body.insertBefore(canvasDiv, document.body.firstChild);

  let isDragging = false;
  let offsetX, offsetY, offsetZ;

  function handleMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - containerDiv.getBoundingClientRect().left;
    offsetY = event.clientY - containerDiv.getBoundingClientRect().top;
    offsetZ = event.clientX - containerDiv.getBoundingClientRect().right;
  }

  function handleMouseMove(event) {
    if (!isDragging) return;

    const newLeft = event.clientX - offsetX;
    const newTop = event.clientY - offsetY;
    const newRight = event.clientX - offsetZ;

    containerDiv.style.left = `${newLeft}px`;
    containerDiv.style.top = `${newTop}px`;
    containerDiv.style.width = `${newRight - newLeft}px`;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  containerDiv.addEventListener("mousedown", handleMouseDown);

  ReactDOM.render(<Popup />, containerDiv);
};

if (!document.getElementById("scrible-root-container")) {
  initializeScribble();
} else {
  const containerDiv = document.getElementById("scrible-root-container");
  containerDiv.style.display = "block";
}