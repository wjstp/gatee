import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import axios from "axios";

const local: AxiosInstance = localAxios("file");
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

// 파일 업로드
export const uploadFileApi = async function (data: FormData,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await axios.post(`${REACT_APP_API_URL}/api/files`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      'Content-Type': 'multipart/form-data'
    }
  }).then(success).catch(fail);
}