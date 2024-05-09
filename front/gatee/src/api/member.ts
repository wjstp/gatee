import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { MemberApiReq, CreateFamilyApiReq, NaggingApiReq } from "@type/index";

const local: AxiosInstance = localAxios();

// 가족 생성
export const createFamilyApi = async function (data: CreateFamilyApiReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.post("/family", data).then(success).catch(fail);
};

// 회원 생성
export const createMemberApi = async function (data: MemberApiReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.post("/members", data).then(success).catch(fail);
};

// 가족 정보 가져오기
export const getFamilyMemberApi = async function (data: string,
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {
  await local.get("/family/1").then(success).catch(fail);
}

// 잔소리 보내기
export const naggingApi = async function (data: NaggingApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void)
{
  await local.post("/notifications/nagging", data).then(success).catch(fail);
};





