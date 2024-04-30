import React from 'react';
import PhotoList from "@components/PhotoList";
import {photoGroup} from "../../constants";

const AllDay = () => {

  return (
    <div className="day-tab--container">
      <PhotoList photoGroup={photoGroup}/>
    </div>
  );
};

export default AllDay;