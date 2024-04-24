import React from 'react';

const Header = () => {
    const name:string = "윤예빈"
    const familyName:string = "윤씨네"
    return (
        <div>
            {/*제목*/}
            <h1>가족 탐구 영역</h1>
            {/*성명*/}
            <div>
                <div>
                    성명
                </div>
                <div>
                    {name}
                </div>
            </div>
            {/*가족명*/}
            <div>
                <div>
                    가족명
                </div>
                <div>
                    {familyName}
                </div>
            </div>
        </div>
    );
};

export default Header;