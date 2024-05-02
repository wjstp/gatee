import React from 'react';
import CustomSwitch from "@components/CustomSwitch";

const SettingsToast = () => {
  return (
    <div className="notification-setting--container">
      <h2 className="setting--title">푸시 알림 설정</h2>

      {/* 설정 컨테이너 */}
      <div className="toggle-set-list--container">

        {/* 한줄 토글 */}
        <div className="toggle-set-one-line--container">
          {/* 앨범 토글 */}
          <div className="toggle-item--container">
            <p>
              앨범
            </p>
            <CustomSwitch sx={{ m: 1 }} defaultChecked />
          </div>

          {/* 한마디 토글 */}
          <div className="toggle-item--container">
            <p>
              한마디
            </p>

              <CustomSwitch sx={{ m: 1 }} defaultChecked />

          </div>
        </div>

        {/* 두번째 줄 토글 */}
        <div className="toggle-set-one-line--container">

          {/* 일정 토글 */}
          <div className="toggle-item--container">

            <p>
              일정
            </p>
            <CustomSwitch sx={{ m: 1 }} defaultChecked />
          </div>

          {/* 깜짝 퀴즈 토글 */}
          <div className="toggle-item--container">
            <p>
              깜짝 퀴즈
            </p>
            <CustomSwitch sx={{ m: 1 }} defaultChecked />
          </div>

        </div>

        {/* 마지막 줄 토글 */}
        <div className="toggle-set-one-line--container">

          {/* 기념일 토글 */}
          <div className="toggle-item--container">
            <p>
              기념일
            </p>
            <CustomSwitch sx={{m: 1}} defaultChecked/>
          </div>

          {/* 기념일 간격 맞추기 위한 div */}
          <div className="toggle-item--container">

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsToast;