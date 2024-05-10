import React, {useEffect} from 'react';
import PhotoList from "@components/PhotoList";
import {photoGroup} from "@constants/index";
import {useOutletContext} from 'react-router-dom';
import {PhotoOutletInfoContext} from "@type/index";
import {getListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";


const AllDay = () => {
  const {familyId} = useFamilyStore()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();

  useEffect(() => {
    // 모든 사진 일별 조회
    const payload = {
      familyId: familyId,
      filter: "DAY",
      year: null,
      month: null
    }
    getListPhotoApi(payload,
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      })
  }, []);
  return (
    <div className="day-tab--container">
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
};

export default AllDay;