import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

interface HandleFinishTab {
  handleFinishTab: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Android = () => {
  return (
    <div className="android">
      <div className="android-header">
        <div className="android-header__part--01">
          '가티'는 앱에서 더 최적화되어 있습니다!
        </div>
        <span className="android-header__part--02">
          <span className="text--01">
            <BsThreeDotsVertical
              className="icon"
            />
            <span className="text">
              &nbsp;→ 홈 화면에 추가
            </span>
          </span>
          <span className="text--02">
            &nbsp;로 빠른 앱 실행을 해보세요!
          </span>
        </span>
      </div>
    </div>
  );
};

export default Android;