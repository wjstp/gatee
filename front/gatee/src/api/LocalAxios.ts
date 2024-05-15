import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const REACT_APP_API_URL: string | undefined = process.env.REACT_APP_API_URL;

export default function localAxios(type?: string) {

  // axios 인스턴스 생성
  const instance: AxiosInstance = axios.create({
    baseURL: `${REACT_APP_API_URL}/api`,
  });

  // 요청(request) interceptor
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const accessToken: string | null = localStorage.getItem("accessToken");

        // Request 발생 시 적용할 axios 요청의 설정 config
        if (type === "file") {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }
        config.headers["Access-Control-Allow-Origin"] = REACT_APP_API_URL;
        config.headers["Access-Control-Allow-Credentials"] = true;

        // 토큰이 존재하는 경우
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch (error: any) {
        console.error("Error while setting authorization header: ", error);
      }

      // 요청을 보내기 전 수행할 작업
      return config;
    },
    (error) => {
      // 오류 요청 가공
      return Promise.reject(error);
    }
  );

  // 다중 요청 대응
  // 토큰이 재발급되는 동안 다른 요청들은 서버에 보내지 않고 모아두었다가 완료 후 한번에 처리
  let isTokenRefreshing: boolean = false;
  let refreshSubscribers: any = [];

  // 토큰 재발급 완료 시
  const onTokenRefreshed = (accessToken: string) => {
    refreshSubscribers.map((callback: any) => callback(accessToken));
  };

  const addRefreshSubscriber = (callback: any) => {
    refreshSubscribers.push(callback);
  };

  // 응답(response) interceptor
  instance.interceptors.response.use(
    // 요청 성공
    async (response: AxiosResponse) => {
      return response;
    },
    // 요청 실패
    async (error: any) => {
      const {
        config,
        response: { status },
      } = error;

      const originalRequest = config;

      // 401 Unauthorized
      if (status === 401) {
        // isTokenRefreshing이 false인 경우에만 token refresh 요청
        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          try {
            // refreshToken 요청
            const res = await axios.post(
              `${REACT_APP_API_URL}/api/jwt/rotate-token`,
              null,
              {
                withCredentials: true,
              }
            );

            // 새로운 토큰 저장
            const newAccessToken: string = await res.headers["access-token"].split(' ')[1];
            localStorage.setItem("accessToken", newAccessToken);
            isTokenRefreshing = false;

            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            // 새로운 토큰으로 지연되었던 요청 진행
            onTokenRefreshed(newAccessToken);

          } catch (refreshError) {
            // 요청 실패 시 로그인 페이지로 리다이렉트
            console.log("Error while refreshing token: ", refreshError);
            window.location.href = "/kakao";
          }
        }

        // 토큰이 재발급 되는 동안의 요청은 refreshSubscribers에 저장
        const retryOriginalRequest = new Promise((resolve) => {
          addRefreshSubscriber((accessToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(instance(originalRequest));
          });
        });

        return retryOriginalRequest;

      // 403 FORBIDDEN
      } else if (status === 403) {
        console.log(error.response.data.message);
        // window.location.href = "/kakao";
      }

      return Promise.reject(error);
    }
  );

  return instance;
}