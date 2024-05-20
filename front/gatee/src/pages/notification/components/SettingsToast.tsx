import React, {useEffect, useState} from 'react';
import CustomSwitch from "@components/CustomSwitch";
import {editAgreeNotificationApi, getAgreeNotificationApi} from "@api/notification";
import {getPushAlarmByLocalStorageApi} from "@api/firebase";
import {requestPermission} from "../../../firebase-messaging-sw";
// import {requestPermission} from "../../../firebase-messaging-sw";


interface HandleFinishTab {
  handleFinishTab: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const SettingsToast = ({handleFinishTab}: HandleFinishTab) => {

  const [albumAlarmChecked, setAlbumAlarmChecked] = useState<boolean>(false);
  const [scheduleAlarmChecked, setScheduleAlarmChecked] = useState<boolean>(false);
  const [naggingAlarmChecked, setNaggingAlarmChecked] = useState<boolean>(false);
  const [featureAlarmChecked, setFeatureAlarmChecked] = useState<boolean>(false);
  const [chatAlarmChecked, setChatAlarmChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  // 스위치 조절 함수
  const handleAlbumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (localStorage.getItem("fcmDeviceToken")) {
      getPushAlarmByLocalStorageApi()
    }
    else {
      requestPermission()
    }
    setAlbumAlarmChecked(event.target.checked);

  };
  const handleNaggingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNaggingAlarmChecked(event.target.checked);
  };
  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScheduleAlarmChecked(event.target.checked);
  };
  const handleAeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureAlarmChecked(event.target.checked);
  };
  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatAlarmChecked(event.target.checked);
  }

  // 완료 버튼 누르면 끝내기
  const handleFinish = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("설정 저장")
    editAgreeNotificationApi(
      {
        albumNotification: albumAlarmChecked,
        naggingNotification: naggingAlarmChecked,
        scheduleNotification: scheduleAlarmChecked,
        featureNotification: featureAlarmChecked,
        chatNotification:chatAlarmChecked
      }, res => {
        console.log(res)
        handleFinishTab(event)
      }, err => {
        console.log(err)
      }
    )

  }


  useEffect(() => {
    getAgreeNotificationApi(res => {
      console.log(res)
      setAlbumAlarmChecked(res.data.albumNotification)
      setNaggingAlarmChecked(res.data.naggingNotification)
      setScheduleAlarmChecked(res.data.scheduleNotification)
      setFeatureAlarmChecked(res.data.featureNotification)
      setChatAlarmChecked(res.data.chatNotification)
      setLoading(false)
    }, err => {
      console.log(err)
    })
  }, []);


  // useEffect(() => {
  //   if(albumAlarmChecked !== null && naggingAlarmChecked !== null && scheduleAlarmChecked !== null && featureAlarmChecked!== null) {
  //
  //   }
  // }, [albumAlarmChecked,naggingAlarmChecked,scheduleAlarmChecked,featureAlarmChecked]);
  // @ts-ignore
  return (

    <div
      className="notification-setting--container">
      {/*{*/}
      {/*  loading ?*/}
      {/*    null*/}
      {/*    :*/}
          <>
            {/* 상단 */}
            <div className="setting-top--container">
              <h2 className="setting--title">푸시 알림 설정</h2>
              <button onClick={handleFinish} className="setting-finish-btn">완료</button>
            </div>
            {/* 설정 컨테이너 */}
            <div className="toggle-set-list--container">

              {/* 한줄 토글 */}
              <div className="toggle-set-one-line--container">
                {/* 앨범 토글 */}
                <div className="toggle-item--container">
                  <p>
                    앨범
                  </p>
                  <CustomSwitch sx={{m: 1}} checked={albumAlarmChecked}
                                onChange={handleAlbumChange}/>
                </div>

                {/* 한마디 토글 */}
                <div className="toggle-item--container">
                  <p>
                    한마디
                  </p>

                  <CustomSwitch sx={{m: 1}} checked={naggingAlarmChecked}
                                onChange={handleNaggingChange}/>

                </div>
              </div>

              {/* 두번째 줄 토글 */}
              <div className="toggle-set-one-line--container">

                {/* 일정 토글 */}
                <div className="toggle-item--container">

                  <p>
                    일정
                  </p>
                  <CustomSwitch sx={{m: 1}} checked={scheduleAlarmChecked}
                                onChange={handleScheduleChange}/>
                </div>

                {/* 깜짝 퀴즈 토글 */}
                <div className="toggle-item--container">
                  <p>
                    일일 정보
                  </p>
                  <CustomSwitch sx={{m: 1}} checked={featureAlarmChecked}
                                onChange={handleAeatureChange}/>
                </div>

              </div>

              <div className="toggle-set-one-line--container">

                {/* 채팅 토글 */}
                <div className="toggle-item--container">
                  <p>
                    채팅
                  </p>
                  <CustomSwitch sx={{m: 1}} checked={chatAlarmChecked}
                                onChange={handleChatChange}/>
                </div>

                {/* 기념일 간격 맞추기 위한 div */}
                <div className="toggle-item--container">

                </div>
              </div>

            </div>
          </>
      {/*}*/}

    </div>
  );
};

export default SettingsToast;
