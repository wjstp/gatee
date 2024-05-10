import axios, { AxiosError, AxiosResponse, AxiosInstance } from "axios";
import { KaKaoLoginReq } from "@type/index";

const REACT_APP_KAKAO_API_URL: string | undefined = process.env.REACT_APP_KAKAO_API_URL
const REACT_APP_API_URL: string | undefined = process.env.REACT_APP_API_URL

// 카카오 토큰을 받는 함수
export const kakaoLoginAPI = async function (data: KaKaoLoginReq,
                                             headers: object,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await axios.post(`${REACT_APP_KAKAO_API_URL}`, data, headers).then(success).catch(fail);
}

// 카카오 토큰으로 우리 서버 토큰을 받는 함수
export const kakaoTokenAPI = async function (headers: object,
                                             success: (res: AxiosResponse<any>) => void,
                                             fail: (err: AxiosError<any>) => void) {
  await axios.post(`${REACT_APP_API_URL}/api/auth/kakao/login`, null, headers).then(success).catch(fail);
}
