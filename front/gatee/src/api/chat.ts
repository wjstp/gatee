import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {SaveExamResultApiReq} from "@type/index";

const local: AxiosInstance = localAxios();

// 참여 신청
export const applyParticipationApi = async function (data: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.patch(`/appointments/${data}`).then(success).catch(fail);
}

// 참여자 리스트 조회
export const getParticipantsApi = async function (data: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.get(`/appointments/${data}`).then(success).catch(fail);
}