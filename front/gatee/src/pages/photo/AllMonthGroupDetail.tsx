import React, {useEffect} from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext, useParams} from "react-router-dom";
import {PhotoOutletInfoContext} from "@type/index";
import {getListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";

const PhotoAllMonthGroupDetail = () => {
  const {familyId} = useFamilyStore()
  const params = useParams()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const {detailPhotoGroup,setDetailPhotoGroup} = usePhotoStore()
  // 상세 사진 불러오기
  const getListPhotoApiFunc = (payload:{
    familyId:string
    filter:string
    year:string
    month:string}
  ) => {
    getListPhotoApi(
      payload,
      res => {
        console.log(res)
        setDetailPhotoGroup(res.data)
      }, err => {
        console.log(err)
      }
    );
  }

  useEffect(() => {
    // params에서 년, 월 뽑아서 API 호출
    if (params.year && params.month) { // Check if params.year is defined
      const payload = {
        familyId: familyId,
        filter: "MONTH",
        year: params.year,
        month: params.month
      };
      getListPhotoApiFunc(payload)

    }
  }, [params.year]);

  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년 {params.month}월
      </div>
      <PhotoList editMode={editMode} photoGroup={detailPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllMonthGroupDetail;