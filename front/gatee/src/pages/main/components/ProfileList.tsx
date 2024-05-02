import React from 'react';
import { Member } from "../../../types/index";
import { FamilyMemberInfoSample } from "../../../constants";

const ProfileList = ({ profileDataList }: { profileDataList: Member[] }) => {
  return (
    <div className="main-profile-list--container">
      {profileDataList.map((member: Member, index: number) => {
        return <ProfileItem key={index} profileData={member} />;
      })}
    </div>
  );
};

const ProfileItem = ({ profileData }: { profileData: Member }) => {
  return (
    <div className="main-profile-list-item--container">

    </div>
  );
};

export default ProfileList;
