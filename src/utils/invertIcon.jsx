export const tintCursorImageRed = (base64Image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64Image;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = 200; 
        data[i + 1] = data[i + 1] * 0.1; 
        data[i + 2] = data[i + 2] * 0.1;
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.shadowColor = "yellow";
      ctx.shadowBlur = 15;

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };

    img.onerror = () => reject(new Error("Failed to load the image."));
  });
};

