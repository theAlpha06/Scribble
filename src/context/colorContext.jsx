import React, { createContext, useState, useEffect } from "react";

const ColorContext = createContext({
  colorName: "white",
  setColorName: () => {}
});

export const ColorProvider = ({ children }) => {
  const [colorName, setColorName] = useState(() => {
    return localStorage.getItem("colorName") || "white";
  });

  useEffect(() => {
    localStorage.setItem("colorName", colorName);
  }, [colorName]);

  return (
    <ColorContext.Provider value={{ colorName, setColorName }}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext };
