import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {MemberApiRes} from "@type/index";
import ProfileModal from "@pages/main/components/ProfileModal";
import useModal from "@hooks/useModal";
import getMoodEmoji from "@utils/getMoodEmoji";
import {naggingApi} from "@api/notification";
import Loading from "@components/Loading";

interface ProfileItemProps {
  profileData: MemberApiRes,
  handleClickProfile: (profileData: MemberApiRes) => void
}

// 프로필 리스트
const ProfileList = ({profileDataList}: { profileDataList: MemberApiRes[] }) => {
  const {isOpen, openModal, closeModal} = useModal();
  const [clickedProfile, setClickedProfile] = useState<MemberApiRes | null>(null);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  // 프로필 클릭했을 때
  const handleClickProfile = (profileData: MemberApiRes) => {
    // 상태 업데이트, 모달 켜주고, 모달 store 업데이트
    setClickedProfile(profileData)
    openModal()
  }

  // 모달 이벤트
  const handleModalEvent = (type: string, content: string) => {
    // 모달 종료
    closeModal()

    // 프로필로 가기일 때
    if (type === "gotoProfile") {
      navigate(`/profile/${clickedProfile?.email}`)

      //  한마디 보내기 일 때
    } else if (type === "sendMessage") {
      console.log(content)
      // 한마디 보내기 api
      if (clickedProfile)
      naggingApi(
        {
          receiverId: clickedProfile?.memberId
          , message: content
        }, res => {
          console.log(res)
        }, err => {
          console.log(err)
          // 로딩
          setLoading(true)
          setTimeout(()=>setLoading(false), 1000)
        }
      )
    }
  }

  return (
    <div className="main-profile-list--container--outside">
      <div className="main-profile-list--container">

        {profileDataList.map((member: MemberApiRes, index: number) => {
          return <ProfileItem key={index} profileData={member} handleClickProfile={handleClickProfile}/>;
        })}

        {
          isOpen ?
            <ProfileModal profileData={clickedProfile} handleModalEvent={handleModalEvent}/>
            :
            null
        }
      </div>
      {loading?
      <Loading/>
        :null
      }
    </div>
  );
};

// 프로필 아이템 
const ProfileItem = ({profileData, handleClickProfile}: ProfileItemProps) => {
  const handleClickProfileItem = () => {
    handleClickProfile(profileData)
  }

  return (
    <div className="main-profile-list-item--box">
      <div className="main-profile-list-item--container"
           onClick={handleClickProfileItem}>
        <p className="main-profile-item-nickname">{profileData.nickname}</p>
        <div className="main-profile-wrapper">
          <img className="main-profile-img" src={profileData.profileImageUrl} alt="프사"/>
          <div className="main-profile-mood">
            {getMoodEmoji(profileData.mood)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileList;
