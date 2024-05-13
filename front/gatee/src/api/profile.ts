import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { ModifyProfileReq, ModifyMoodReq } from "@type/index";

const local: AxiosInstance = localAxios();
const local_file: AxiosInstance = localAxios("file");

// 기분 상태 수정
export const modifyMoodApi = async function (data: ModifyMoodReq,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.patch(`/members/moods`, data).then(success).catch(fail);
}

// 프로필 수정
export const modifyProfileApi = async function (data: ModifyProfileReq,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local.patch(`/members/profile`, data).then(success).catch(fail);
};

// 프로필 이미지 수정
export const modifyProfileImageApi = async function (data: FormData,
                                                     success: (res: AxiosResponse<any>) => void,
                                                     fail: (err: AxiosError<any>) => void) {
  await local_file.post(`/members/image`, data).then(success).catch(fail);
}