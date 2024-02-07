alert('Hello from your Chrome extension!');

import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '../popup.jsx';

function injectComponent() {

  const containerDiv = document.createElement('div');

  containerDiv.id = 'scrible-root-container';
  containerDiv.style.position = 'absolute';
  containerDiv.style.top = '20px';
  containerDiv.style.right = '20px';
  containerDiv.style.zIndex = '9999';
  containerDiv.style.border = '1px solid black';
  containerDiv.style.borderRadius = '1rem';
  containerDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  containerDiv.style.fontFamily = 'Arial, sans-serif';
  containerDiv.style.fontSize = '16px';
  containerDiv.style.color = 'black';

  document.body.appendChild(containerDiv);

  ReactDOM.render(<Popup />, containerDiv);
}

injectComponent();