import Resizer from "react-image-file-resizer"

// 이미지 리사이저
export const imageResizer = (file: File, width: number, height: number) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, // 파일 형태
      width, // 픽셀
      height, // 픽셀
      "JPEG", // 변환 이미지 타입
      100, // 품질
      0, // 방향회전
      (uri) => {
        resolve(uri);
      },
      "file" // 반환 타입
    );
  });
}