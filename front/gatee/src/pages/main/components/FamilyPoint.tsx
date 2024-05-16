import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import {useFamilyStore} from "@store/useFamilyStore";

export const FamilyPoint = () => {
  const {familyScore, stringImage, familyName} = useFamilyStore()
  const myFamilyTemp = 36 + familyScore
  const fontSizeFunc = (fontLength: number) => {
    if (fontLength <= 4) {
      return 28
    } else if (fontLength === 5) {
      return 26
    } else {
      return 24
    }
  }
  return (
    <div className="main-family-info">
      {/* 가족 온도 */}
      <div className="title--container">
        <img src={stringImage} className="main-family-img" alt=""/>
        <div className="title--content" style={{fontSize: fontSizeFunc(familyName.length)}}>
          {familyName} 온도
        </div>
        <div className="title--temperature">{myFamilyTemp}ºC</div>
      </div>

      {/* 가족 온도 지수 그래프 */}
      <div className="progressbar-container">
        <ProgressBar completed={myFamilyTemp}
                     height={"20px"}
                     maxCompleted={100}
                     bgColor={"#FFA41C"}
                     baseBgColor={"#f6f6f6"}
                     isLabelVisible={false}
        />
      </div>

    </div>
  )
}