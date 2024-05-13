import React, { useState , useCallback } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";
import getCroppedImage from "@utils/getCroppedImage";
import { imageResizer } from "@utils/imageResizer";

const ProfileCropper = (props: {
  cropImage: string,
  cropShape: "rect" | "round",
  handleModalEvent: () => void,
  sender: string
}) => {
  const { cropImage, cropShape, handleModalEvent, sender } = props;
  const { setFamilyImage, setStringImage } = useFamilyStore();
  const { setMemberImage, setStringMemberImage } = useMemberStore();

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 크롭조정
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    console.log(croppedAreaPixels)
  }

  // 이미지 저장하기
  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels || !cropImage) return;

    try {
      const blob = await getCroppedImage(
        cropImage,
        croppedAreaPixels
      );

      // Blob을 File로 변환
      const fileName = "croppedImage.png";
      const lastModified = new Date().getTime();
      const file = new File([blob], fileName, { type: "image/jpeg", lastModified });
      const resizedFile: File = (await imageResizer(file, 500, 500)) as File;
      console.log(resizedFile);
      const jpgUrl = URL.createObjectURL(resizedFile);

      // 가족사진일 경우에만 가족 스토어 수정
      if (sender === "family-set") {
        setFamilyImage(resizedFile);
        setStringImage(jpgUrl);
      } else {
        setMemberImage(resizedFile);
        setStringMemberImage(jpgUrl);
      }
      handleModalEvent();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, cropImage]);

  // URL을 받아서 File 객체로 변환하는 함수
  const convertURLToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], "profile_image", { type: "image/jpeg" });
  }
  
  // 모달 닫기
  const handleCancel = () => {
    handleModalEvent();
  };

  return (
    <div
      className="profile-cropper"
      onClick={handleModalEvent}
    >
      
      {/*모달 내용*/}
      <div className="profile-cropper__content">
        <Cropper
          image={cropImage}
          crop={crop}
          zoom={zoom}
          aspect={4 / 4}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropShape={cropShape}
          showGrid={false}
          style={{
            containerStyle: {
              width: "100%",
              height: "90%",
              position: "relative",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              backgroundColor: "black",
            },
          }}
        />
        <div className="profile-cropper__btn">
          <button
            className="btn-cancel"
            onClick={handleCancel}
          >
          <span className="btn-cancel--text">
            취소
          </span>
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
          >
          <span className="btn-save--text">
            저장
          </span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProfileCropper;