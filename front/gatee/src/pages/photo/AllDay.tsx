import React from 'react';
import PhotoList from "@components/PhotoList";
import {photoGroup} from "../../constants";
import { useOutletContext } from 'react-router-dom';
import {PhotoOutletInfoContext} from "../../types/index";


const AllDay = () => {

  const { editMode,handleChecked } = useOutletContext<PhotoOutletInfoContext>();

  return (
    <div className="day-tab--container">
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
};

export default AllDay;