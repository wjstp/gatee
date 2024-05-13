import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { MemberApiRes, NaggingApiReq } from "@type/index";

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
export const createMemberApi = async function (data: MemberApiRes,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local.post("/members", data).then(success).catch(fail);
};


// 내 정보 조회
export const getMyDataApi = async function (success: (res: AxiosResponse<any>) => void,
                                            fail: (err: AxiosError<any>) => void) {
  await local.get("/members").then(success).catch(fail);
}

// 가족 정보 가져오기
export const getFamilyMemberApi = async function (data: {
                                                    familyId:string
                                                  },
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {
  await local.get("/family", {params:data}).then(success).catch(fail);
}


interface EditProfileApiReq {
  "name" : string;
  "nickname" : string;
  "birth" : string;
  "birthType" : string;
  "role" : string;
  "familyId" : string;
  "phoneNumber" : string;
}
// 정보 수정
export const editProfileApi = async function (data: EditProfileApiReq,
                                          success: (res: AxiosResponse<any>) => void,
                                          fail: (err: AxiosError<any>) => void) {
  await local.patch("/members/profile", data).then(success).catch(fail);
};

