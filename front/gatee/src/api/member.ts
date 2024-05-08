import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { MemberReq, CreateFamilyReq } from "@type/index";

const local: AxiosInstance = localAxios();

// 가족 생성
export const createFamilyApi = async function (data: CreateFamilyReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.post("/family", data).then(success).catch(fail);
};

// 회원 생성
export const createMemberApi = async function (data: MemberReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.post("/members", data).then(success).catch(fail);
};
