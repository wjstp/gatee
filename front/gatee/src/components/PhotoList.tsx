import React from 'react';
// import sampleImage from "@assets/images/schedule/calendarBanner3.jpg"

// 사진 그룹 타입
interface PhotoListProps {
    photoGroup: {
        dateTime:string,
        src: string
    }[]
}

// 채팅 앨범과 모든 사진의 일별 사진, 월별 연별 앨범 사진 상세페이지에서 활용됨
const PhotoList = ({photoGroup}:PhotoListProps) => {

    return (
        <div className="photo__item__list-container">
            {/* 사진 묶음 - 3개씩 보여주기 */}
            {photoGroup.map((item: any,index    ) => {
                return (
                    <div className="photo__item"
                         key={index}>
                        <img src={item.src} alt=""/>
                    </div>)
            })}

        </div>
    )

}

export default PhotoList;