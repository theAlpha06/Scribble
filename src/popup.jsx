import React from "react";
import { render } from "react-dom";
import './popup.css';
import ActionBar from "./components/ActionBar.jsx";

function Popup() {
    return (
        <main className="container">
            <ActionBar />
        </main >
    )
}

render(<Popup />, document.getElementById("popup-root"));