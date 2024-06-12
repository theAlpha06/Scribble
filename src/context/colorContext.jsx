import React, { createContext, useState, useEffect } from "react";

const ColorContext = createContext({
  colorName: "#fff",
  setColorName: () => {}
});

export const ColorProvider = ({ children }) => {
  const [colorName, setColorName] = useState(() => {
    return localStorage.getItem("colorName") || "#fff";
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
