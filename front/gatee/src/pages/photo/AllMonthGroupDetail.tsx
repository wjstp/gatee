import React, {useEffect, useState} from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext, useParams} from "react-router-dom";
// import {photoGroup} from "@constants/index";
import {PhotoOutletInfoContext} from "@type/index";
import {getListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";

const PhotoAllMonthGroupDetail = () => {
  const {familyId} = useFamilyStore()
  const params = useParams()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
const [photoGroup,setPhotoGroup] = useState([])
  useEffect(() => {
    // params에서 년, 월 뽑아서 API 호출
    if (params.year && params.month) { // Check if params.year is defined
      const payload = {
        familyId: familyId,
        filter: "MONTH",
        year: params.year,
        month: params.month
      };
      getListPhotoApi(
        payload,
        res => {
          console.log(res)
          setPhotoGroup(res.data)
        }, err => {
          console.log(err)
        }
      );
    }
  }, [params.year]); // Include params.year in the dependency array

  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년 {params.month}월
      </div>
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllMonthGroupDetail;