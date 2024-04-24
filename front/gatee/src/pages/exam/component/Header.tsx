import React from 'react';

const Header = () => {
const name:string = "윤예빈"
const familyName:string = "윤씨네"
return (
    <div className="exam__header">
        {/*제목*/}
        <h1 className="exam__header-title">가족 탐구 영역</h1>
        {/*성명*/}
        <div className="exam__header-info">
        <div className="exam__header-border">
            <div className="exam__header-border-left">
                성명
            </div>
            <div className="exam__header-border-right">
                {name}
            </div>
        </div>

        {/*가족명*/}
        <div className="exam__header-border">
            <div className="exam__header-border-left">
                가족명
            </div>
            <div className="exam__header-border-right">
                {familyName}
            </div>
        </div>
    </div>
        <div className="exam__header-footer">

        </div>
    </div>
);
};

export default Header;