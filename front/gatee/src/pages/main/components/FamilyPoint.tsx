import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";

export const FamilyPoint = () => {
  const familyInfo = {
    myFamilyTemp: 36,
    avgTemp: 35,
    totalTemp: 100
  }
  return (
    <div className="main-family-info">
      {/* 가족 온도 */}
      <div className="title--container">
        <div className="title--content">우리 가족 온도</div>
        <div className="title--temperature">{familyInfo.myFamilyTemp}ºC</div>
      </div>

      {/* 가족 온도 지수 그래프 */}
      <ProgressBar completed={familyInfo.myFamilyTemp}
                   height={"20px"}
                   maxCompleted={familyInfo.totalTemp}
                   bgColor={"#FFA41C"}
                   baseBgColor={"#f6f6f6"}
                   isLabelVisible={false}
      />

      {/* 평균 가족 데이터와 비교 */}
      {
        familyInfo.myFamilyTemp > familyInfo.avgTemp ?
          <div className="compare-with-avg-content">평균 가족보다 약 {familyInfo.myFamilyTemp - familyInfo.avgTemp}ºC 높아요</div>
          : familyInfo.myFamilyTemp === familyInfo.avgTemp ?
            <div className="compare-with-avg-content">평균 가족과 온도가 동일해요</div>
            :
            <div className="compare-with-avg-content">평균 가족보다 약 {familyInfo.myFamilyTemp - familyInfo.avgTemp}ºC 낮아요</div>
      }

    </div>
  )
}