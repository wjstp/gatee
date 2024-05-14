import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ScheduleCreateReq } from "@type/index";


const local: AxiosInstance = localAxios();


// 전체 일정 조회

// 일정 상세 조회

// 일정 등록
export const createScheduleApi = async function (data: ScheduleCreateReq,
                                                     success: (res: AxiosResponse<any>) => void,
                                                     fail: (err: AxiosError<any>) => void) {
  await local.post(`/schedule`, data).then(success).catch(fail);
}
// 일정 수정

// 일정 삭제

// 일정 참여

// 일정 후기 등록

// 일정 후기 삭제
