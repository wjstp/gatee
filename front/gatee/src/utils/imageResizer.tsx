import Resizer from "react-image-file-resizer"

export const imageResizer = (file: File) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
}