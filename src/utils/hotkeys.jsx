import { useEffect } from "react";

const KeyboardListener = ({
  setToolToPen,
  setToolToEraser,
  setToolToMouse,
  handleScreenshot,
  clearCanvas,
  handleExit
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.shiftKey) {
        switch (event.code) {
          case "Digit1":
            setToolToPen();
            break;
          case "Digit2":
            setToolToEraser();
            break;
          case "Digit3":
            setToolToMouse();
            break;
          case "Digit4":
            handleScreenshot();
            break;
          case "Digit5":
            clearCanvas();
            break;
          case "Digit6":
            handleExit();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setToolToPen, setToolToEraser, setToolToMouse, handleScreenshot, clearCanvas, handleExit]);

  return null;
};

export default KeyboardListener;
