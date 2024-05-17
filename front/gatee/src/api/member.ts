import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import {
  GetFamilyMemberApiReq,
  CreateFamilyCodeApiReq,
  JoinFamilyApiReq,
  CreateMemberApiReq,
  GetFamilyDataApiReq,
  ChangeFamilyNameApiReq
} from "@type/index";

const local: AxiosInstance = localAxios();
const local_file: AxiosInstance = localAxios("file");

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

// 가족 코드로 가족 조회
export const getFamilyDataApi = async function (data: GetFamilyDataApiReq,
                                                success: (res: AxiosResponse<any>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  await local.get(`/family/check`, { params: data }).then(success).catch(fail);
}

// 가족 합류
export const joinFamilyApi = async function (data: JoinFamilyApiReq,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.post(`/family/join`, data).then(success).catch(fail);
}

// 가족 이름 수정
export const changeFamilyNameApi = async function (data: ChangeFamilyNameApiReq,
                                                success: (res: AxiosResponse<any>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  await local.patch(`/family/${data.familyId}`, data.familyName).then(success).catch(fail);
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