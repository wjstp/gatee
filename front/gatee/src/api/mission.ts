import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosResponse, AxiosInstance} from "axios";

const local: AxiosInstance = localAxios("default");


// 미션 조회
export const getMissionApi = async function (success: (res: AxiosResponse<any>) => void,
                                                    fail: (err: AxiosError<any>) => void) {
  await local.get(`/missions`).then(success).catch(fail);
}

// 미션 수행
export const doMissionApi = async function (data:{type:string},success: (res: AxiosResponse<any>) => void,
                                            fail: (err: AxiosError<any>) => void) {
  await local.patch(`/missions`,data).then(success).catch(fail);
}

// 미션 완료
export const completeMissionApi = async function (data:{type:string},success: (res: AxiosResponse<any>) => void,
                                            fail: (err: AxiosError<any>) => void) {
  await local.patch(`/missions/complete `,data).then(success).catch(fail);
}
