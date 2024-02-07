alert('Hello from your Chrome extension!');
import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '../popup.jsx';
import './styles.css';

function injectComponent() {

  const containerDiv = document.createElement('div');

  containerDiv.id = 'scrible-root-container';
  containerDiv.classList = 'scribble-root-container';

  document.body.appendChild(containerDiv);

  ReactDOM.render(<Popup />, containerDiv);
}

injectComponent();