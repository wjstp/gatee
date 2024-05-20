import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import axios from "axios";

const local: AxiosInstance = localAxios("file");
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// 파일 업로드
export const uploadFileApi = async function (data: FormData,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.post(`/files`, data, {
  }).then(success).catch(fail);
}