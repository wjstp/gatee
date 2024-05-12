import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosResponse, AxiosInstance} from "axios";
import { SaveAskAnswerApiReq} from "@type/index";

const local: AxiosInstance = localAxios("default");


// 백문백답 안푼 문제 조회
export const getNewDictAskApi = async function (success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.get("/features").then(success).catch(fail);
}


// 백문백답 푼문제 조회
export const getAnsweredAskApi = async function (success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.get("/features/results").then(success).catch(fail);
}


// 답변 저장
export const sumbitAskAnswerApi = async function (data:SaveAskAnswerApiReq,
                                                      success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.post(`/features`,data).then(success).catch(fail);
}

// 답변 수정
export const editAskAnswerApi = async function (data:SaveAskAnswerApiReq,
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {
  await local.patch(`/features`,data).then(success).catch(fail);
}
