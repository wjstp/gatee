import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosResponse, AxiosInstance} from "axios";
import {NaggingApiReq} from "@type/index";

const local: AxiosInstance = localAxios("default");

interface NotificationAgrees {
  "albumNotification": boolean;
  "naggingNotification": boolean;
  "scheduleNotification": boolean;
  "featureNotification": boolean;
}

// 알람 동의 변경
export const editAgreeNotification = async function (data: NotificationAgrees,
                                                     success: (res: AxiosResponse<any>) => void,
                                                     fail: (err: AxiosError<any>) => void) {
  await local.patch(`/notifications`, data).then(success).catch(fail);
}

// 잔소리 보내기
export const naggingApi = async function (data: NaggingApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void) {
  await local.post("/notifications/nagging", data).then(success).catch(fail);
};

// 알람 동의 변경
export const getAgreeNotification = async function (success: (res: AxiosResponse<any>) => void,
                                                    fail: (err: AxiosError<any>) => void) {
  await local.get(`/notifications`).then(success).catch(fail);
}

