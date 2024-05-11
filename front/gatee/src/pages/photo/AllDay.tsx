import React, {useEffect, useState} from 'react';
import PhotoList from "@components/PhotoList";
// import {photoGroup} from "@constants/index";
import {useOutletContext} from 'react-router-dom';
import {PhotoOutletInfoContext} from "@type/index";
import {getListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";


const AllDay = () => {
  const {familyId} = useFamilyStore()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const {detailPhotoGroup,setDetailPhotoGroup} = usePhotoStore()
  const getListPhotoApiFunc = () => {
    // 모든 사진 일별 조회
    const payload = {
      familyId: familyId,
      filter: "DAY",
      year: "",
      month: ""
    }
    getListPhotoApi(payload,
      res => {
        console.log(res)
        setDetailPhotoGroup(res.data)
      },
      err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getListPhotoApiFunc()
  }, []);
  return (
    <div className="day-tab--container">
      <PhotoList editMode={editMode} photoGroup={detailPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
};

export default AllDay;