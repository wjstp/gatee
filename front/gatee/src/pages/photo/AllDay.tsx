import React, {useEffect} from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext} from 'react-router-dom';
import {PhotoOutletInfoContext} from "@type/index";
import {getListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";
import {useShallow} from "zustand/react/shallow";


const AllDay = () => {
  const {familyId} = useFamilyStore()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const {setDetailPhotoGroup} = usePhotoStore()
  const { detailPhotoGroup } = usePhotoStore(
    useShallow((state) => ({
      detailPhotoGroup: state.detailPhotoGroup,
    })),
  )
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

  useEffect(() => {
    console.log(detailPhotoGroup)
  }, [detailPhotoGroup]);
  return (
    <div className="day-tab--container">
      <PhotoList editMode={editMode} photoGroup={detailPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
};

export default AllDay;