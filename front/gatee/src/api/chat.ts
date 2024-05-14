import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import { SendFileReq } from "@type/index";

const local: AxiosInstance = localAxios();

// 참여 신청
export const applyAppointmentParticipationApi = async function (data: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.patch(`/appointments/${data}`).then(success).catch(fail);
}

// 참여자 리스트 조회
export const getAppointmentParticipantsApi = async function (data: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.get(`/appointments/${data}`).then(success).catch(fail);
}

// 채팅방 사진 조회
export const getChatFileApi = async function (data: number,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.get(`/chatroom/${data}`).then(success).catch(fail);
}

// 채팅방 사진 등록
export const sendChatFileApi = async function (data: SendFileReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  const { chatroomId, fileIdList } = data;
  await local.post(`/schedule$/{chatroomId}`, fileIdList).then(success).catch(fail);
}