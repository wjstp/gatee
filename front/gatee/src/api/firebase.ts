import localAxios from "@api/LocalAxios";
import {AxiosInstance} from "axios";

const local: AxiosInstance = localAxios();

// 디바이스 토큰 서버로 보내는 함수
export const getPushAlarmByLocalStorageApi = async () => {
  try {
    const fcmDeviceToken: string | null = localStorage.getItem('fcmDeviceToken');
    local.patch(`/members/notifications`,
      {notificationToken: fcmDeviceToken})
      .then(res => {
        console.log("토큰 발신 성공")
      })
      .catch(err => alert(err))
  } catch (error) {
    console.log(`getPushAlarmByLocalStorageApi 에러 발생 : ${error}`);
  }
};