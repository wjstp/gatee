import React from 'react';
// import sampleImage from "@assets/images/schedule/calendarBanner3.jpg"

// 사진 그룹 타입
interface PhotoListProps {
    photoGroup: {
        address: string
    }[]
}

const PhotoList = ({photoGroup}:PhotoListProps) => {

    return (
        <div className="photo__item__list-container">

            {/* 사진 묶음 - 3개씩 보여주기 */}
            {photoGroup.map((item: any) => {
                return (
                    <div className="photo__item"
                         key={item}>
                        <img src={item.address} alt=""/>
                    </div>)
            })}

        </div>
    )

}

export default PhotoList;