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
      })
      .catch(err => console.log(err))
  } catch (error) {
    console.error(`getPushAlarmByLocalStorageApi 에러 발생 : ${error}`);
  }
};