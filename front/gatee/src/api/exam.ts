import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosResponse, AxiosInstance} from "axios";
import {ExamResult, SaveExamResultApiReq} from "@type/index";

const local: AxiosInstance = localAxios("default");


// 시험 문제 조회
export const getNewExamApi = async function (success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.get("/exams").then(success).catch(fail);
}

export const getAllFamilyExamResultApi = async function (success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.get("/exams/results/family").then(success).catch(fail);
}


// 가족 상세 시험 결과 리스트 조회
export const getFamilyExamResultApi = async function (data:string,
                                                success: (res: AxiosResponse<ExamResult[]>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  await local.get(`/exams/${data}/results`).then(success).catch(fail);
}

// 내 시험 결과 리스트 조회
export const getMyExamResultApi = async function (success: (res: AxiosResponse<ExamResult[]>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  await local.get("/exams/results").then(success).catch(fail);
}
// 시험 결과 상세 조회
export const getDetailExamResultApi = async function (data:string|number,
                                                      success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.get(`/exams/results/details`,{params:{examId:data}}).then(success).catch(fail);
}



// 시험 결과 저장
export const saveExamResultApi = async function (data: SaveExamResultApiReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {

  await local.post(`/exams`, data).then(success).catch(fail);
}

