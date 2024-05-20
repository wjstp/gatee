import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import { SendFileReq } from "@type/index";

const local: AxiosInstance = localAxios();

// 참여 신청
export const applyAppointmentParticipationApi = async function (appointmentId: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.patch(`/appointments/${appointmentId}`).then(success).catch(fail);
}

// 참여자 리스트 조회
export const getAppointmentParticipantsApi = async function (appointmentId: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.get(`/appointments/${appointmentId}`).then(success).catch(fail);
}

// 채팅방 사진 조회
export const getChatFileApi = async function (chatRoomId: number,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.get(`/chatroom/${chatRoomId}`).then(success).catch(fail);
}

// 채팅방 사진 등록
export const sendChatFileApi = async function (requestData: SendFileReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  const { chatRoomId, fileIdList } = requestData;
  await local.post(`/chatroom/${chatRoomId}`, {fileIdList}).then(success).catch(fail);
}