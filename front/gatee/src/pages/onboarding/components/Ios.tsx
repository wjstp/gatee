import React from 'react';
import { IoShareOutline } from "react-icons/io5";

const Ios = () => {
  return (
    <div className="ios">
      <div className="ios-header">
        <div className="ios-header__part--01">
          '가티'는 앱에서 더 최적화되어 있습니다!
        </div>
        <div className="ios-header__part--02">
          <span className="text--01">
            <IoShareOutline
              className="icon"
            />
            <span className="text">
            &nbsp;→ 홈 화면에 추가
            </span>
          </span>
          <span className="text--02">
            &nbsp;로 빠른 앱 실행을 해보세요!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ios;