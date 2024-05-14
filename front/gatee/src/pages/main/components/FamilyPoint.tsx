import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import {useFamilyStore} from "@store/useFamilyStore";

export const FamilyPoint = () => {
  const {familyScore} = useFamilyStore()
  const myFamilyTemp = 36 + familyScore * 0.1
  return (
    <div className="main-family-info">
      {/* 가족 온도 */}
      <div className="title--container">
        <div className="title--content">우리 가족 온도</div>
        <div className="title--temperature">{myFamilyTemp}ºC</div>
      </div>

      {/* 가족 온도 지수 그래프 */}
      <ProgressBar completed={myFamilyTemp}
                   height={"20px"}
                   maxCompleted={100}
                   bgColor={"#FFA41C"}
                   baseBgColor={"#f6f6f6"}
                   isLabelVisible={false}
      />

    </div>
  )
}