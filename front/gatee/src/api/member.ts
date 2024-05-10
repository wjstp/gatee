import localAxios from "@api/LocalAxios";
import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { MemberApiReq, CreateFamilyApiReq, NaggingApiReq } from "@type/index";

const local: AxiosInstance = localAxios();
const local_file: AxiosInstance = localAxios("file");

// 가족 생성
export const createFamilyApi = async function (data: FormData,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local_file.post(`/family`, data, {
  }).then(success).catch(fail);
};

// 회원 생성
export const createMemberApi = async function (data: MemberApiReq,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local.post("/members", data).then(success).catch(fail);
};


// 내 정보 조회
export const getMyDataApi = async function (success: (res: AxiosResponse<any>) => void,
                                            fail: (err: AxiosError<any>) => void) {
  await local.get("/members").then(success).catch(fail);
}

interface GetFamilyMemberApiReq {
  familyId:string
}
// 가족 정보 가져오기
export const getFamilyMemberApi = async function (data: GetFamilyMemberApiReq,
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {
  await local.get("/family", {params:data}).then(success).catch(fail);
}

// 잔소리 보내기
export const naggingApi = async function (data: NaggingApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void) {
  await local.post("/notifications/nagging", data).then(success).catch(fail);
};
