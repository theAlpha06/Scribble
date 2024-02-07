import React from "react";
import { render } from "react-dom";
import './popup.css';

function Popup() {
    return (
        <div className="scribble">
            Scribble is there for you!
        </div >
    )
}

render(<Popup />, document.getElementById("popup-root"));