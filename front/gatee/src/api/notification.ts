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
export const editAgreeNotificationApi = async function (data: NotificationAgrees,
                                                        success: (res: AxiosResponse<any>) => void,
                                                        fail: (err: AxiosError<any>) => void) {
    await local.patch(`/notifications/agreements`, data).then(success).catch(fail);
}

// 잔소리 보내기
export const naggingApi = async function (data: NaggingApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void) {
    await local.post("/notifications/nagging", data).then(success).catch(fail);
};

// 알람 동의 조회
export const getAgreeNotificationApi = async function (success: (res: AxiosResponse<any>) => void,
                                                       fail: (err: AxiosError<any>) => void) {
    await local.get(`/notifications/agreements`).then(success).catch(fail);
}

// 맨 처음 알림 리스트
export const getNotificationListFirstApi = async function (success: (res: AxiosResponse<any>) => void,
                                                           fail: (err: AxiosError<any>) => void) {
    await local.get(`/notifications`).then(success).catch(fail);
}

// 무한 스크롤 알림 리스트
export const getNotificationListNextApi = async function (data: string|null,
                                                          success: (res: AxiosResponse<any>) => void,
                                                          fail: (err: AxiosError<any>) => void) {
    await local.get(`/notifications`, {params: {cursor: data}}).then(success).catch(fail);
}


// 알람 읽음처리
export const readNotificationApi = async function (data: {notificationId:string},
                                                        success: (res: AxiosResponse<any>) => void,
                                                        fail: (err: AxiosError<any>) => void) {
  await local.patch(`/notifications/check`, data).then(success).catch(fail);
}

