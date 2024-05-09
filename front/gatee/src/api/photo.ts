import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";

const local: AxiosInstance = localAxios("default");
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

interface UploadPhotoApiReq {
    "memberFamilyId":string,
    "fileId":number
}

// 사진 업로드
export const uploadPhotoApi = async function (data: UploadPhotoApiReq,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
    await local.post(`${REACT_APP_API_URL}/api/photos/save`, data, {
    }).then(success).catch(fail);
}