import React from "react";
import ActionBar from "./components/ActionBar.jsx";
import { ColorProvider } from "./context/colorContext.jsx";

export function Popup() {
  return (
    <ColorProvider>
      <main>
        <ActionBar />
      </main>
    </ColorProvider>
  );
}