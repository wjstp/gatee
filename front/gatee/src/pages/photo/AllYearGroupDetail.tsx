import React, {useEffect} from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext, useParams} from "react-router-dom";
import {PhotoOutletInfoContext} from "@type/index";
import {useFamilyStore} from "@store/useFamilyStore";
import {getListPhotoApi} from "@api/photo";
import {usePhotoStore} from "@store/usePhotoStore";

interface RouteParams {
  [key: string]: string | undefined;
}

const PhotoAllYearGroupDetail = () => {
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const {familyId} = useFamilyStore()
  const params = useParams<RouteParams>()
  const {detailPhotoGroup,setDetailPhotoGroup} = usePhotoStore()
  // 상세 사진 불러오기
  const getListPhotoApiFunc = (payload:
                                 {
    familyId:string
    filter:string
    year:string
    month:string|null
  }
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
    // params에서 년 뽑아서 API 호출
    if (params.year) { // Check if params.year is defined
      const payload = {
        familyId: familyId,
        filter: "YEAR",
        year: params.year,
        month: null
      };
      getListPhotoApiFunc(payload)

    }
  }, [params.year]); // Include params.year in the dependency array

  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년
      </div>
      <PhotoList editMode={editMode} photoGroup={detailPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllYearGroupDetail;