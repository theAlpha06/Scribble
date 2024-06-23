export const saveCanvasToLocalStorage = (canvas) => {
  if (canvas) {
    const dataURL = canvas.toDataURL();
    localStorage.setItem("savedCanvas", dataURL);
  }
};

export const loadCanvasFromLocalStorage = (canvas) => {
  const savedCanvas = localStorage.getItem("savedCanvas");
  if (savedCanvas && canvas) {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
    };
    img.src = savedCanvas;
  }
};
