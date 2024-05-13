import localAxios from "@api/LocalAxios";
import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import {
  GetFamilyMemberApiReq,
  CreateFamilyCodeApiReq,
  NaggingApiReq,
  CreateMemberApiReq,
  JoinFamilyApiReq
} from "@type/index";

const local: AxiosInstance = localAxios();
const local_file: AxiosInstance = localAxios("file");
const REACT_APP_API_URL: string | undefined = process.env.REACT_APP_API_URL;

// 가족 생성
export const createFamilyApi = async function (data: FormData,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local_file.post(`/family`, data).then(success).catch(fail);
};

// 가족 코드 생성
export const createFamilyCodeApi = async function (data: CreateFamilyCodeApiReq,
                                                   success: (res: AxiosResponse<any>) => void,
                                                   fail: (err: AxiosError<any>) => void) {
  await local.get(`/family/code`, { params: data }).then(success).catch(fail);
}

// 가족 합류
export const joinFamilyApi = async function (data: JoinFamilyApiReq,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.post(`/family/join`, data).then(success).catch(fail);
}

// 가족 정보 조회
export const getFamilyMemberApi = async function (data: GetFamilyMemberApiReq,
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {
  await local.get("/family", { params: data }).then(success).catch(fail);
}

// 회원 생성
export const createMemberApi = async function (data: CreateMemberApiReq,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local.patch("/members", data).then(success).catch(fail);
};

// 내 정보 조회
export const getMyDataApi = async function (success: (res: AxiosResponse<any>) => void,
                                            fail: (err: AxiosError<any>) => void) {
  await local.get("/members").then(success).catch(fail);
}

// 잔소리 보내기
export const naggingApi = async function (data: NaggingApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void) {
  await local.post("/notifications/nagging", data).then(success).catch(fail);
};
