import React, {useEffect, useState} from 'react';
import {IoHeart} from "react-icons/io5";
import {IoHeartOutline} from "react-icons/io5";
import {useFamilyStore} from "@store/useFamilyStore";
import {createReactionPhotoApi, deleteDetailPhotoApi, deleteReactionPhotoApi} from "@api/photo";
import {useMemberStore} from "@store/useMemberStore";
import {RiDeleteBin6Line} from "react-icons/ri";
import {useNavigate} from "react-router-dom";

interface MemberReaction {
  memberId: string;
  content: string;
}

interface PhotoDetailData {
  reactionList: MemberReaction[];
  imageUrl: string;
  isReaction: boolean;
  photoId: number;
}


const PhotoItem = ({photoDetailData}: { photoDetailData: PhotoDetailData }) => {
  const {myInfo} = useMemberStore()
  const [isPressed, setIsPressed] = useState(photoDetailData.isReaction);
  const {familyInfo,familyId} = useFamilyStore()
  const [reactionList, setReactionList] = useState(photoDetailData.reactionList)
  const navigate = useNavigate();
  // 멤버 Id 받아서 아이콘 Url 반환하는 함수
  const findProfile = (memberId: string) => {
    if (familyInfo.length > 0) {
      return familyInfo.find(member => member.memberId === memberId)?.profileImageUrl;
    } else {
      return ""
    }
  }
  // 좋아요 누르기
  const createReactionPhotoApiFunc = () => {
    createReactionPhotoApi(
      photoDetailData.photoId,
      res => {
        console.log(res)
        setIsPressed(!isPressed);
        setReactionList(prevReactionList => {
          // memberId가 12인 원소가 이미 있는지 확인
          const existingReaction = prevReactionList.find(reaction => reaction.memberId === myInfo.memberId);
          if (!existingReaction) {
            // memberId가 12인 원소가 없으면 추가
            return [...prevReactionList, {memberId: myInfo.memberId, content: "heart"}];
          }
          return prevReactionList; // 이미 좋아요를 눌렀으면 변동 없음
        });

      },
      err => {
        console.log(err)
      }
    )
  }

  // 좋아요 취소하기
  const deleteReactionPhotoApiFunc = () => {
    deleteReactionPhotoApi(
      photoDetailData.photoId,
      res => {
        console.log(res)
        setIsPressed(!isPressed);
        // API 호출 성공 시 reactionList 업데이트
        setReactionList(prevReactionList => {
          // memberId가 12인 원소를 제외한 배열 반환
          return prevReactionList.filter(reaction => reaction.memberId !== myInfo.memberId);
        });
      },
      err => {
        console.log(err)
      }
    )
  }

  // 좋아요 누르기 함수
  const pressHeart = () => {
    if (!isPressed) {
      createReactionPhotoApiFunc()
    } else {
      deleteReactionPhotoApiFunc()
    }
  };

  const deletePhotoApiFunc = () => {
    deleteDetailPhotoApi(
      photoDetailData.photoId,familyId,
      res => {
        console.log(res)
        navigate("/photo")
      }, err => {
        console.log(err)
        navigate("/photo")
      })
  }

  // 사진 다운받기 => 서버 주소로 변경하기
  // const downloadPhoto = () => {
  //   fetch(photoDetailData?.imageUrl)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.blob();
  //     })
  //     .then(blob => {
  //       const type = blob.type.split("/")[1]; // 이미지의 MIME 타입에서 "image/"를 제거하여 확장자 추출
  //       const url = window.URL.createObjectURL(new Blob([blob], {type}));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `photo.${type}`); // 파일 이름에 이미지 확장자 추가
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     })
  //     .catch(error => console.error("Error downloading photo:", error));
  // };

  useEffect(() => {
    setIsPressed(photoDetailData.isReaction);
    setReactionList(photoDetailData.reactionList)
  }, [photoDetailData]);

  return (
    <div className="photo-detail--container">
      {/* 서버 주소로 변경할 것 */}
      <img className="photo-detail-img" src={photoDetailData.imageUrl} alt=""/>

      <div className="interaction--container">
        <div className={`liked--container${isPressed ? '--active' : ''}`}>
          <IoHeart onClick={pressHeart} size={35} />

          {/* 좋아요 누른 사람 */}
          <div className="liked-profiles--container">
            {reactionList.map((item, index) => {
              return <img key={index} className="liked-icon" src={findProfile(item?.memberId)} alt=""/>;
            })}
          </div>
        </div>
        <RiDeleteBin6Line size={30} color="gray" onClick={deletePhotoApiFunc}/>
      </div>
    </div>
  );
};

export default PhotoItem;
