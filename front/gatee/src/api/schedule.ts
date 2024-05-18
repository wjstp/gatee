import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  ScheduleListReq,
  CreateScheduleReq,
  ModifyScheduleReq,
  ScheduleDetailReq,
  CreateRecordReq } from "@type/index";


const local: AxiosInstance = localAxios();


// 전체 일정 조회
export const getAllScheduleApi = async function (data: ScheduleListReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  const { familyId, month } = data;
  await local.get(`/schedule?familyId=${familyId}&month=${month}`).then(success).catch(fail);
}

// 일정 상세 조회
export const getDetailScheduleApi = async function (requestData: ScheduleDetailReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  const { scheduleId, familyId } = requestData;
  await local.get(`/schedule/${scheduleId}?familyId=${familyId}`).then(success).catch(fail);
}

// 일정 등록
export const createScheduleApi = async function (data: CreateScheduleReq,
                                                     success: (res: AxiosResponse<any>) => void,
                                                     fail: (err: AxiosError<any>) => void) {
  await local.post(`/schedule`, data).then(success).catch(fail);
}

// 일정 수정
export const modifyScheduleApi = async function (requestData: ModifyScheduleReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  const { scheduleId, data } = requestData;
  await local.patch(`/schedule/${scheduleId}`, data).then(success).catch(fail);
}

// 일정 삭제
export const deleteScheduleApi = async function (scheduleId: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.delete(`/schedule/${scheduleId}`).then(success).catch(fail);
}

// 일정 참여
export const applyScheduleParticipationApi = async function (requestData: ScheduleDetailReq,
                                                    success: (res: AxiosResponse<any>) => void,
                                                    fail: (err: AxiosError<any>) => void) {
  const { scheduleId, familyId } = requestData;
  await local.post(`/schedule/${scheduleId}`, {familyId}).then(success).catch(fail);
}

// 일정 참여 취소
export const cancelScheduleParticipationApi = async function (requestData: ScheduleDetailReq,
                                                success: (res: AxiosResponse<any>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  const { scheduleId, familyId } = requestData;
  await local.patch(`/schedule/${scheduleId}/cancel`, {familyId}).then(success).catch(fail);
}

// 일정 후기 등록
export const createRecordApi = async function (requestData: CreateRecordReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  const { scheduleId, data } = requestData;
  await local.post(`/schedule/${scheduleId}/record`, data).then(success).catch(fail);
}

// 일정 후기 삭제
export const deleteRecordApi = async function (scheduleRecordId: number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.delete(`/schedule/${scheduleRecordId}`).then(success).catch(fail);
}