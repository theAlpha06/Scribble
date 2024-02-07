import React from "react";
import { render } from "react-dom";
import './popup.css';
import ActionBar from "./components/ActionBar.jsx";

function Popup() {
    return (
        <main className="container" draggable="true">
            <ActionBar />
        </main >
    )
}

render(<Popup />, document.getElementById("popup-root"));