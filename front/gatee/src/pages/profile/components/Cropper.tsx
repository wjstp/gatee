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
  const { setFamilyImage, setStringImage, setInputImage, setInputStringImage } = useFamilyStore();
  const { setMemberImage, setStringMemberImage, setMyInfo } = useMemberStore();

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // 크롭조정
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
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
      const fileName = "croppedImage.jpg";
      const lastModified = new Date().getTime();
      const file = new File([blob], fileName, { type: "image/jpeg", lastModified });
      const resizedFile: File = (await imageResizer(file, 500, 500)) as File;
      const jpgUrl = URL.createObjectURL(resizedFile);

      // 가족사진일 경우에만 가족 스토어 수정
      if (sender === "family-set") {
        setFamilyImage(resizedFile);
        setStringImage(jpgUrl);
      } else if (sender === "member-set") {
        setMemberImage(resizedFile);
        setStringMemberImage(jpgUrl);
      } else if (sender === "profile") {
        setMemberImage(resizedFile);
        setMyInfo({
          profileImageUrl: jpgUrl,
        })
      } else {
        setInputImage(resizedFile);
        setInputStringImage(jpgUrl);
      }
      handleModalEvent();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, cropImage]);

  // 모달 닫기
  const handleCancel = () => {
    handleModalEvent();
  };

  // 모달 내용 클릭 시 이벤트 전파 막기
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className="profile-cropper"
      onClick={handleModalEvent}
    >

      {/*모달 내용*/}
      <div
        className="profile-cropper__content"
        onClick={handleContentClick}
      >
        <Cropper
          image={cropImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
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
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              backgroundColor: "black",
              borderBottom: "3px solid white"
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