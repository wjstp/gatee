import localAxios from "@api/LocalAxios";
import { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { FileReq } from "@type/index";

const local: AxiosInstance = localAxios();

// 파일 업로드
export const uploadFileApi = async function (data: FileReq,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await local.post("/files", data, {
    headers: {
      "content-type": "multipart/form-data"
    }
  }).then(success).catch(fail);
};